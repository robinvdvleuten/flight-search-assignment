import * as React from "react";

export interface Flight {
  flightIdentifier: string;
  flightNumber: string;
  airport: string;
  expectedTime: string;
  originalTime: string;
  url: string;
}

export interface FlightResult extends Flight {
  highlight: JSX.Element;
  sortableTime: number;
}

interface FlightResponse {
  flights: Flight[];
}

interface ErrorResponse {
  error: string;
}

interface UseFlightsOptions {
  minChars?: number;
  maxChars?: number;
  maxResults?: number;
}

export function useFlights(opts: UseFlightsOptions = {}) {
  const [results, setResults] = React.useState<FlightResult[] | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isSearching, setIsSearching] = React.useState<boolean>(false);

  async function searchFlights(query: string) {
    if (
      query.length < (opts.minChars || 3) ||
      (opts.maxChars && opts.maxChars > 0 && query.length > opts.maxChars)
    ) {
      // Don't search if the query is either too short or too long.
      setResults(null);
      return;
    }

    setIsSearching(true);

    let response = await window.fetch(`/flights.json?q=${query}`);

    if (!response.ok) {
      let { error }: ErrorResponse = await response.json();

      setResults(null);
      setError(new Error(error));
      setIsSearching(false);
      return;
    }

    let results: FlightResponse = await response.json();

    setResults(matchFlights(results.flights, query, opts.maxResults || 5));
    setError(null);
    setIsSearching(false);
  }

  return { results, error, isSearching, searchFlights } as const;
}

/**
 * Match flights against a query and return the results.
 *
 * It will find flights with a matching airport name (both lower and uppercase).
 * After that, it will sort the results by expected time and return a maximum of results.
 */
function matchFlights(
  flights: Flight[],
  query: string,
  maxResults: number
): FlightResult[] {
  return flights
    .filter((f) => f.airport.toLowerCase().includes(query.toLowerCase()))
    .map((f) => ({
      ...f,
      sortableTime: timeToSeconds(f.expectedTime),
      highlight: highlightMatch(f.airport, query),
    }))
    .sort((a, b) => a.sortableTime - b.sortableTime)
    .slice(0, maxResults);
}

/**
 * Highlight a match in a string.
 *
 * It will return a JSX element with the matched part wrapped in an <em> tag.
 */
function highlightMatch(text: string, query: string): JSX.Element {
  let index = text.toLowerCase().indexOf(query.toLowerCase());

  return (
    <React.Fragment>
      {text.slice(0, index)}
      <em>{text.slice(index, index + query.length)}</em>
      {text.slice(index + query.length)}
    </React.Fragment>
  );
}

/**
 * Convert a given time string (HH:mm) to seconds.
 */
function timeToSeconds(time: string): number {
  let [hours, minutes] = time.split(":");
  return parseInt(hours) * 3600 + parseInt(minutes) * 60;
}
