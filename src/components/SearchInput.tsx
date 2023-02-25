import React from "react";

interface SearchInputProps extends React.ComponentPropsWithoutRef<"div"> {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  ...rest
}) => {
  function handleQueryChange(e: React.FormEvent<HTMLInputElement>) {
    onSearch(e.currentTarget.value);
  }

  return (
    <div {...rest}>
      <label>
        <span>Search</span>
        <input
          type="text"
          name="q"
          onChange={handleQueryChange}
        />
      </label>
    </div>
  );
};

export default SearchInput;
