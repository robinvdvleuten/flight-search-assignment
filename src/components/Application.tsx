import * as React from "react";
import { useFlights } from "../hooks/flights";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import styles from "./Application.module.css";

const Application: React.FC = () => {
  const { results, error, searchFlights } = useFlights();

  function handleSearchInput(query: string) {
    searchFlights(query);
  }

  return (
    <div className={styles.application}>
      <h1>Schiphol Flight Search</h1>
      <SearchInput onSearch={handleSearchInput} />

      {error && (
        <p className={styles.error}>
          An error occurred while searching flights.
        </p>
      )}

      <SearchResults className={styles.searchResults} results={results} />
    </div>
  );
};

export default Application;
