import React from "react";
import { useFlights } from "../hooks/flights";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";
import styles from "./Application.module.css";

const Application: React.FC = () => {
  const { results, searchFlights } = useFlights();

  function handleSearchInput(query: string) {
    searchFlights(query);
  }

  return (
    <div className={styles.application}>
      <h1>
        Schiphol Flight Search
      </h1>
      <SearchInput onSearch={handleSearchInput} />
      <SearchResults className={styles.searchResults} results={results} />
    </div>
  );
};

export default Application;
