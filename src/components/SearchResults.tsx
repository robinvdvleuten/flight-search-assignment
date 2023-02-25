import React from "react";
import { FlightResult } from "../hooks/flights";
import SearchResult from "./SearchResult";

enum SortDirection {
  ASC = 1,
  DESC = -1,
}

type FlightResultKey = keyof FlightResult;

interface SortableTableHeaderProps
  extends React.ComponentPropsWithoutRef<"th"> {
  sortKey: FlightResultKey;
  onSort: (key: FlightResultKey) => void;
}

const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  children,
  sortKey,
  onSort,
  ...rest
}) => (
  <th onClick={() => onSort(sortKey)} {...rest}>
    {children}
    <span>&uarr;</span>
    <span>&darr;</span>
  </th>
);

interface SearchResultsProps
  extends Omit<React.ComponentPropsWithoutRef<"table">, "results"> {
  initialSortKey?: FlightResultKey;
  initialSortDirection?: SortDirection;
  results: FlightResult[] | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  initialSortKey = "sortableTime",
  initialSortDirection = SortDirection.ASC,
  ...rest
}) => {
  const [sortedResults, setSortedResults] = React.useState<
    FlightResult[] | null
  >(results);
  const [sortedKey, setSortedKey] =
    React.useState<FlightResultKey>(initialSortKey);
  const [sortedDirection, setSortedDirection] =
    React.useState<SortDirection>(initialSortDirection);

  function handleResultsSort(key: FlightResultKey) {
    setSortedKey(key);
    // Toggle direction if already sorted by this key.
    setSortedDirection((prev) => (sortedKey === key ? prev * -1 : prev));
  }

  React.useEffect(() => {
    // Reset sorting state to defaults when results change.
    setSortedResults(results);
    setSortedKey(initialSortKey);
    setSortedDirection(initialSortDirection);
  }, [results]);

  React.useEffect(() => {
    setSortedResults((sortedResults) =>
      sortedResults
        ? [...sortedResults].sort((a, b) => {
            let aVal = a[sortedKey],
              bVal = b[sortedKey];

            if (aVal === bVal) {
              return 0;
            }

            return aVal > bVal ? sortedDirection : sortedDirection * -1;
          })
        : null
    );
  }, [sortedKey, sortedDirection]);

  return (
    <div {...rest}>
      <table>
        <thead>
          <tr>
            <SortableTableHeader
              scope="col"
              sortKey="flightIdentifier"
              onSort={handleResultsSort}
            >
              Flight Identifier
            </SortableTableHeader>
            <SortableTableHeader
              scope="col"
              sortKey="flightNumber"
              onSort={handleResultsSort}
            >
              Flight Number
            </SortableTableHeader>
            <SortableTableHeader
              scope="col"
              sortKey="airport"
              onSort={handleResultsSort}
            >
              Airport
            </SortableTableHeader>
            <SortableTableHeader
              scope="col"
              sortKey="sortableTime"
              onSort={handleResultsSort}
            >
              Expected Time
            </SortableTableHeader>
            <th scope="col">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedResults ? (
            sortedResults.length > 0 ? (
              sortedResults.map((result) => (
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
