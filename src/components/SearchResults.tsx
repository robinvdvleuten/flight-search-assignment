import React from "react";
import cx from "clsx";
import { FlightResult } from "../hooks/flights";
import SearchResult from "./SearchResult";
import styles from "./SearchResults.module.css";

type FlightResultKey = keyof FlightResult;

interface SortableTableHeaderProps
  extends React.ComponentPropsWithoutRef<"th"> {
  sortKey: FlightResultKey;
  currentSortKey: FlightResultKey;
  onSort: (key: FlightResultKey) => void;
}

const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  children,
  sortKey,
  currentSortKey,
  onSort,
  ...rest
}) => (
  <th
    onClick={() => onSort(sortKey)}
    data-key={sortKey}
    data-current={sortKey === currentSortKey ? "true" : undefined}
    {...rest}
  >
    {children} <span className={styles.sortAsc}>&darr;</span>
    <span className={styles.sortDesc}>&uarr;</span>
  </th>
);

enum SortDirection {
  ASC = 1,
  DESC = -1,
}

interface SearchResultsProps
  extends Omit<React.ComponentPropsWithoutRef<"table">, "results"> {
  initialSortKey?: FlightResultKey;
  initialSortDirection?: SortDirection;
  results: FlightResult[] | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  className,
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
        ? sortedResults.slice(0).sort((a, b) => {
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
    <div
      className={cx(styles.searchResults, className)}
      data-direction={
        sortedResults
          ? sortedDirection === SortDirection.ASC
            ? "asc"
            : "desc"
          : undefined
      }
      {...rest}
    >
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr>
            <SortableTableHeader
              className={styles.tableHeader}
              scope="col"
              sortKey="flightIdentifier"
              currentSortKey={sortedKey}
              onSort={handleResultsSort}
            >
              Flight Identifier
            </SortableTableHeader>
            <SortableTableHeader
              className={styles.tableHeader}
              scope="col"
              sortKey="flightNumber"
              currentSortKey={sortedKey}
              onSort={handleResultsSort}
            >
              Flight Number
            </SortableTableHeader>
            <SortableTableHeader
              className={styles.tableHeader}
              scope="col"
              sortKey="airport"
              currentSortKey={sortedKey}
              onSort={handleResultsSort}
            >
              Airport
            </SortableTableHeader>
            <SortableTableHeader
              className={styles.tableHeader}
              scope="col"
              sortKey="sortableTime"
              currentSortKey={sortedKey}
              onSort={handleResultsSort}
            >
              Expected Time
            </SortableTableHeader>
            <th className={styles.tableHeader} scope="col" data-key="url">
              <span className="sr-only">URL</span>
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
                <td className={styles.tableColumn} colSpan={5}>
                  No flights found for given destination.
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td className={styles.tableColumn} colSpan={5}>
                Start searching by typing your destination.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SearchResults;
