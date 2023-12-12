
export const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {


    return (<>
      <div>
        <div className="flex justify-start ml-auto mr-auto max-w-screen-lg mb-10">
          <select
            className="category-filter"
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </div>


    </div></>)
}