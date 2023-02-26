import * as React from "react";
import { clsx } from "clsx";
import styles from "./SearchInput.module.css";
import { useDebounce } from "../hooks/debounce";

interface SearchInputProps extends React.ComponentPropsWithoutRef<"div"> {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  className,
  onSearch,
  ...rest
}) => {
  const [query, setQuery] = React.useState<string>("");
  const debouncedQuery = useDebounce(query, 300);

  function handleQueryChange(e: React.FormEvent<HTMLInputElement>) {
    setQuery(e.currentTarget.value);
  }

  React.useEffect(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <div className={clsx(styles.searchInput, className)} {...rest}>
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
