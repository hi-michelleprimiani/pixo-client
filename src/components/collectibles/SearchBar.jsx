



export const SearchBar = ({ onSearchChange }) => {
    return (
      <input 
        type="text" 
        placeholder="Search collectibles..." 
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input-class" // Add your CSS class for styling
      />
    );
  };
  