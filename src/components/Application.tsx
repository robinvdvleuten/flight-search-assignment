import React from "react";
import { useFlights } from "../hooks/flights";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

const Application: React.FC = () => {
  const { results, searchFlights } = useFlights();

  function handleSearchInput(query: string) {
    searchFlights(query);
  }

  return (
    <div>
      <SearchInput onSearch={handleSearchInput} />
      <SearchResults results={results} />
    </div>
  );
};

export default Application;
