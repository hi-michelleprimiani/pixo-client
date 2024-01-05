import { Select } from "@radix-ui/themes";

export const CategoryAndSearchFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  handleSearchChange,
  filteredCollectibles,
}) => {
  return (
    <>
      <div className="flex justify-between ml-auto mr-auto max-w-screen-lg mb-8">
        <div className="flex-1">
          <Select.Root
            size="3"
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <Select.Trigger variant="surface" />
            <Select.Content variant="soft">
              <Select.Group>
                <Select.Item value="all">Select A Category</Select.Item>
                {categories?.map((category) => (
                  <Select.Item key={category.id} value={category.id.toString()}>
                    {category.label}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </div>
        {/* Search Bar */}
        <div className="flex-1 text-right">
          <input
            type="text"
            placeholder="Search Items"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-3 py-2 border border-gray-300 rounded-3xl focus:border-green-500 focus:outline-none"
          />
        </div>
        {filteredCollectibles.length === 0 && searchQuery && (
          <div className="text-center my-4">
            <p>No items found for your search.</p>
          </div>
        )}
      </div>
    </>
  );
};
