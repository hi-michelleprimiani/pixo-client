import { useEffect, useState } from "react"
import { getAllCollectibles } from "../managers/CollectibleManager"
import { Button } from "@radix-ui/themes"
import { useNavigate } from "react-router-dom"



export const CreateCollectibleForm = () => {
    const initItemState = {
        name: "",
        description: "",
        price: "",
        material: "",
        color: "",
        size: ""
    }
    const initImageState1 = {
        img_url: ""
    }
    const initImageState2 = {
        img_url: ""
    }
    const initImageState3 = {
        img_url: ""
    }
    const [image1, updateImage1] = useState(initImageState1)
    const [image2, updateImage2] = useState(initImageState2)
    const [image3, updateImage3] = useState(initImageState3)
    const [item, updateItem] = useState(initItemState)
    const [chosenCategories, updateChosen] = useState(new Set())
    const [categories, changeCategories] = useState([{ id: 1, name: "Art & Collectibles"}, {id: 2, name: "Home & Living"}])
    const navigate = useNavigate()

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
        await fetch(`http://localhost:8000/collectibles`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...item, images: image1, image2, image3, categories: Array.from(chosenCategories)})
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

    const handleImageInput1 = (e) => updateImage1({ img_url: e.target.value });
    const handleImageInput2 = (e) => updateImage2({ img_url: e.target.value });
    const handleImageInput3 = (e) => updateImage3({ img_url: e.target.value });
    

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
                        <div className="images">
                        Please Upload Up To Three Images
                        <fieldset>
                        <label htmlFor="image1">Image 1:</label>
                        <input
                            id="image1"
                            type="text"
                            className="form-control"
                            onChange={(e) => handleImageInput1(e, 0)}
                        />
                        </fieldset>
                        <fieldset>
                        <label htmlFor="image2">Image 2:</label>
                        <input
                            id="image2"
                            type="text"
                            className="form-control"
                            onChange={(e) => handleImageInput2(e, 1)}
                        />
                        </fieldset>
                        <fieldset>
                        <label htmlFor="image3">Image 3:</label>
                        <input
                            id="image3"
                            type="text"
                            className="form-control"
                            onChange={(e) => handleImageInput3(e, 2)}
                        />
                        </fieldset>

                        </div>
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
                            Post Item
                        </Button>
                    </form>
                </section>
            </main>
        </>
    )
}