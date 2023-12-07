import { useEffect, useState } from "react"
import { getAllCollectibles } from "../managers/CollectibleManager"
import { Button } from "@radix-ui/themes"



export const CreateCollectibleForm = () => {
    const initItemState = {
        name: "",
        description: "",
        price: "",
        material: "",
        color: "",
        size: ""
    }
    const [item, updateItem] = useState(initItemState)
    const [chosenCategories, updateChosen] = useState(new Set())
    const [categories, changeCategories] = useState([{ id: 1, name: "Art & Collectibles"}, {id: 2, name: "Home & Living"}])

    const fetchCategories  = async () => {
        const response = await fetch("http://localhost:8000/categories", {
            headers: {
                Authorization: `Token ${localStorage.getItem("auth_token")}`,
              },
        })
        const categories = await response.json()
        changeCategories(categories)
      };

    const postCollectible = async (evt) => {
        evt.preventDefault()

        await fetch(`http://localhost:8000/collectible`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...item, categories: Array.from(chosenCategories)})
        })
        await getAllCollectibles()
        navigate("/")
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    const handleCategoryChosen = (category) => {
        const copy = new Set(chosenCategories)
        copy.has(category.id) ? copy.delete(category.id) : copy.add(category.id)
        updateChosen(copy)
    }

    const handleUserInput = (e) => updateItem({ ...item, [e.target.id]: e.target.value })

    const formInput = (prop) => <input id={prop} type="text" value={item[prop]}
        className="form-control" onChange={handleUserInput} />

    return (
        <>
            <main>
                <section>
                    <form className="form-main">
                        <h1>Post New Item</h1>
                        <fieldset>
                            <label htmlFor="name">Name:</label>
                            {formInput("name")}
                        </fieldset>
                        <fieldset>
                            <label htmlFor="description">Description:</label>
                            {formInput("description")}
                        </fieldset>
                        <fieldset>
                            <label htmlFor="price">Price:</label>
                            {formInput("price")}
                        </fieldset>
                        <fieldset>
                            <label htmlFor="material">Material:</label>
                            {formInput("material")}
                        </fieldset>
                        <fieldset>
                            <label htmlFor="color">Color:</label>
                            {formInput("color")}
                        </fieldset>
                        <fieldset>
                            <label htmlFor="size">Size:</label>
                            {formInput("size")}
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <div>Categories:</div>
                                {
                                    categories.map(c => <div key={`category-${c.id}`}>
                                        <input type="checkbox"
                                                checked={chosenCategories.has(c.id)}
                                                onChange={() => handleCategoryChosen(c)}
                                        /> {c.label}
                                    </div>)
                                }
                            </div>
                        </fieldset>
                        <Button 
                        type="submit"
                        onClick={postCollectible}
                        >
                            Add Book
                        </Button>
                    </form>
                </section>
            </main>
        </>
    )
}