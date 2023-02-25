import React from "react";
import { FlightResult } from "../hooks/flights";

interface SearchResultProps extends React.ComponentPropsWithoutRef<"div"> {
  result: FlightResult;
}

const SearchResult: React.FC<SearchResultProps> = ({ result, ...rest }) => {
  return (
    <tr {...rest}>
      <th scope="row">{result.flightIdentifier}</th>
      <td>{result.flightNumber}</td>
      <td>{result.highlight}</td>
      <td>{result.expectedTime}</td>
      <td>
        <a href={result.url}>Details &rarr;</a>
      </td>
    </tr>
  );
};

export default SearchResult;
