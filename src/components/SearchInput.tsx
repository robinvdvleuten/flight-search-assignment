import React from "react";
import cx from "clsx";
import styles from "./SearchInput.module.css";

interface SearchInputProps extends React.ComponentPropsWithoutRef<"div"> {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  className,
  onSearch,
  ...rest
}) => {
  function handleQueryChange(e: React.FormEvent<HTMLInputElement>) {
    onSearch(e.currentTarget.value);
  }

  return (
    <div className={cx(styles.searchInput, className)} {...rest}>
      <label>
        <span className="sr-only">Search</span>
        <input
          className={styles.input}
          type="text"
          name="q"
          placeholder="Search flight"
          onChange={handleQueryChange}
        />
      </label>
    </div>
  );
};

export default SearchInput;
