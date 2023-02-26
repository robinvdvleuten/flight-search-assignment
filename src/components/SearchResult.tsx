import * as React from "react";
import { FlightResult } from "../hooks/flights";
import styles from "./SearchResult.module.css";

interface SearchResultProps extends React.ComponentPropsWithoutRef<"div"> {
  result: FlightResult;
}

const SearchResult: React.FC<SearchResultProps> = ({ result, ...rest }) => {
  return (
    <tr {...rest}>
      <th
        className={styles.tableColumn}
        data-key="flightIdentifier"
        scope="row"
      >
        {result.flightIdentifier}
      </th>
      <td className={styles.tableColumn} data-key="flightNumber">
        {result.flightNumber}
      </td>
      <td className={styles.tableColumn} data-key="airport">
        {result.highlight}
      </td>
      <td className={styles.tableColumn} data-key="expectedTime">
        {result.expectedTime}
      </td>
      <td className={styles.tableColumn} data-key="url">
        <a href={result.url}>Details &rarr;</a>
      </td>
    </tr>
  );
};

export default SearchResult;
