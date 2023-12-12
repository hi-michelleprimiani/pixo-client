import { useEffect, useState } from "react"
import { getAllCategories } from "../managers/CategoriesManager"
import { getAllCollectiblesAndUser } from "../managers/CollectibleManager"
import { AspectRatio, Card, Container, Grid, Inset } from "@radix-ui/themes";



export const CategoryFilter = ({ categories, selectedCategory, setSelectedCategory }) => {


    return (<><div>
          <div>
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