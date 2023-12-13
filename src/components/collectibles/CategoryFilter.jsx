export const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <>
      <div className="flex justify-start ml-auto mr-auto max-w-screen-lg mb-10">
        <select
          className="form-select px-3 py-2 text-base font-normal text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">Select A Category</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
              </option>
          ))}
        </select>
      </div>
    </>
  );
};
