import { ReactSearchAutocomplete } from "react-search-autocomplete";

const items = [
  { id: 0, name: "Cobol" },
  { id: 1, name: "JavaScript" },
  { id: 2, name: "Basic" },
  { id: 3, name: "PHP" },
  { id: 4, name: "Java" },
];

interface Item {
  id: number;
  name: string;
}

const SearchBar = () => {
  const handleOnSearch = (string: string, results: Item[]) => {
    console.log(string, results);
  };

  const handleOnHover = (result: Item) => {
    console.log(result);
  };

  const handleOnSelect = (item: Item) => {
    console.log(item);
  };

  const handleOnFocus = () => {
    console.log("Focused");
  };

  const handleOnClear = () => {
    console.log("Cleared");
  };

  return (
    <ReactSearchAutocomplete
      items={items}
      onSearch={handleOnSearch}
      onHover={handleOnHover}
      onSelect={handleOnSelect}
      onFocus={handleOnFocus}
      onClear={handleOnClear}
      styling={{ zIndex: 4 }} // To display it on top of the search box below
      autoFocus
      maxLength={10}
    />
  );
};

export default SearchBar;
