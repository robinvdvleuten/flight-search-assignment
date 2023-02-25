import React from "react";
import { FlightResult } from "../hooks/flights";
import SearchResult from "./SearchResult";

interface SearchResultsProps
  extends Omit<React.ComponentPropsWithoutRef<"table">, "results"> {
  results: FlightResult[] | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, ...rest }) => {
  return (
    <div {...rest}>
      <table>
        <thead>
          <tr>
            <th scope="col">Flight Identifier</th>
            <th scope="col">Flight Number</th>
            <th scope="col">Airport</th>
            <th scope="col">Expected Time</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {results ? (
            results.length > 0 ? (
              results.map((result) => (
                <SearchResult key={result.flightIdentifier} result={result} />
              ))
            ) : (
              <tr>
                <td colSpan={5}>No flights found for given destination.</td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={5}>Start searching by typing your destination.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResults;
