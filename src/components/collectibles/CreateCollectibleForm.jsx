import { useEffect, useState } from "react"
import { getAllCollectiblesAndUser } from "../managers/CollectibleManager"
import { Box, Button, Container } from "@radix-ui/themes"
import { useNavigate } from "react-router-dom"
import { FormInput } from "../utils/FormInput"



export const CreateCollectibleForm = () => {
    const initItemState = {
        name: "",
        description: "",
        price: "",
        material: "",
        color: "",
        size: ""
    }
    const initImageState1 = ""
    const initImageState2 = ""
    const initImageState3 = ""
    const [image1, updateImage1] = useState(initImageState1)
    const [image2, updateImage2] = useState(initImageState2)
    const [image3, updateImage3] = useState(initImageState3)
    const imagesArray = [
        image1,
        image2,
        image3
    ];
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

      const imagesObjectsArray = imagesArray
      .filter(imageUrl => imageUrl !== "")
      .map(imageUrl => {
        return { img_url: imageUrl };
    });

    const postCollectible = async (evt) => {
        evt.preventDefault()
        await fetch(`http://localhost:8000/collectibles`, {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...item, images: imagesObjectsArray, categories: Array.from(chosenCategories)})
        })
        await getAllCollectiblesAndUser()
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

    const handleImageInput1 = (e) => updateImage1(e.target.value);
    const handleImageInput2 = (e) => updateImage2(e.target.value);
    const handleImageInput3 = (e) => updateImage3(e.target.value);
    

    const handleUserInput = (e) => updateItem({ ...item, [e.target.id]: e.target.value })

    const formInput = (prop) => <input id={prop} type="text" value={item[prop]}
        className="form-control" onChange={handleUserInput} />

        return (
            <>
                <Box className="bg-gray-100 min-h-screen flex justify-center items-center">
                    <Container className="m-10 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                        <form className="space-y-4">
                            <h1 className="text-3xl font-bold text-center mb-6">Post New Item</h1>
                            <fieldset className="space-y-2">
                                <label htmlFor="name" className="block text-lg font-bold text-gray-700 leading-tight">Name</label>
                                <FormInput type="text" id="name" value={item.name} onChange={handleUserInput} />
                            </fieldset>
                            <fieldset className="space-y-2">
                                <label htmlFor="description" className="block text-lg font-bold text-gray-700 leading-tight">Description</label>
                                <FormInput type="textarea" id="description" value={item.description} onChange={handleUserInput} className="w-full p-2 border border-gray-300 rounded-lg" rows="4" />
                            </fieldset>
                            <fieldset className="space-y-2">
                                <label htmlFor="price" className="block text-lg font-bold text-gray-700 leading-tight">Price</label>
                               <FormInput type="text" id="price" value={item.price} onChange={handleUserInput} />
                            </fieldset>
                            <fieldset className="space-y-2">
                                <label htmlFor="material" className="block text-lg font-bold text-gray-700 leading-tight">Material</label>
                               <FormInput type="text" id="material" value={item.material} onChange={handleUserInput} />
                            </fieldset>
                            <fieldset className="space-y-2">
                                <label htmlFor="color" className="block text-lg font-bold text-gray-700 leading-tight">Color</label>
                               <FormInput type="text" id="color" value={item.color} onChange={handleUserInput} />
                            </fieldset>
                            <fieldset className="space-y-2">
                                <label htmlFor="size" className="block text-lg font-bold text-gray-700 leading-tight">Size</label>
                               <FormInput type="text" id="size" value={item.size} onChange={handleUserInput} />
                            </fieldset>
                            <div className="block text-gray-700 leading-tight">
                                <div className="text-1xl font-bold text-center mb-6">
                                Please Provide Up To Three Image URLS
                                </div>
                                <fieldset className="space-y-2">
                                    <label htmlFor="image1" className="block text-lg font-bold text-gray-700 leading-tight"></label>
                                    <input
                                        id="image1"
                                        type="url"
                                        autoComplete="off"
                                        placeholder="first image"
                                        className="w-full p-2 border border-gray-300 rounded-lg leading-tight"
                                        onChange={(e) => handleImageInput1(e)}
                                    />
                                </fieldset>
                                <fieldset className="space-y-2">
                                    <label htmlFor="image2" className="block text-lg font-bold text-gray-700 leading-tight"></label>
                                    <input
                                        id="image2"
                                        type="url"
                                        autoComplete="off"
                                        placeholder="second image"
                                        className="w-full p-2 border border-gray-300 rounded-lg leading-tight"
                                        onChange={(e) => handleImageInput2(e)}
                                    />
                                </fieldset>
                                <fieldset className="space-y-2">
                                    <label htmlFor="image3" className="block text-lg font-bold text-gray-700 leading-tight"></label>
                                    <input
                                        id="image3"
                                        type="url"
                                        autoComplete="off"
                                        placeholder="third image"
                                        className="w-full p-2 border border-gray-300 rounded-lg leading-tight"
                                        onChange={(e) => handleImageInput3(e)}
                                    />
                                </fieldset>
                            </div>
                            <fieldset className="space-y-2">
                                <div className="form-group">
                                    <p className="text-1xl font-bold text-center mb-6">Categories</p>
                                    {categories.map((c) => (
                            <FormInput
                                key={`category-${c.id}`}
                                type="checkbox"
                                id={`category-${c.id}`}
                                checked={chosenCategories.has(c.id)}
                                onChange={() => handleCategoryChosen(c)}
                                className="appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-green checked:border-transparent focus:outline-none"
                            >
                                {c.label}
                            </FormInput>
                        ))}
                                </div>
                            </fieldset>
                            <Button type="submit" onClick={postCollectible}>
                                Post Item
                            </Button>
                        </form>
                    </Container>
                </Box>
            </>
        );
                                    }        