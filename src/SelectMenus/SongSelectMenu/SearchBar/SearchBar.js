const SearchBar = ({ handleSearchChange, handleSearchSubmit }) => {
  return (
    <div className="search-bar">
      <input
        id="search-music"
        name="search-input"
        className="form-control form-control-dark w-100"
        type="text"
        placeholder="Search Song"
        aria-label="Search"
        onChange={handleSearchChange}
      />
      <button
        className="search-button"
        type="submit"
        onClick={handleSearchSubmit}
      >
        Search
      </button>
    </div>
  );
};
export default SearchBar;
