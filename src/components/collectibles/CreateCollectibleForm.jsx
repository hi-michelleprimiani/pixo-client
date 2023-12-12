import { useEffect, useState } from "react"
import { getAllCollectiblesAndUser } from "../managers/CollectibleManager"
import { Box, Button, Container } from "@radix-ui/themes"
import { useNavigate } from "react-router-dom"
import { FormInput } from "../utils/FormInput"
import { getAllCategories } from "../managers/CategoriesManager"



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

    const fetchCategories = async () => {
        const categoriesData = await getAllCategories();
        changeCategories(categoriesData);
    };

      useEffect(() => {
          fetchCategories()
      }, [])

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


    const handleCategoryChosen = (category) => {
        const copy = new Set(chosenCategories)
        copy.has(category.id) ? copy.delete(category.id) : copy.add(category.id)
        updateChosen(copy)
    }

    const handleImageInput1 = (e) => updateImage1(e.target.value);
    const handleImageInput2 = (e) => updateImage2(e.target.value);
    const handleImageInput3 = (e) => updateImage3(e.target.value);
    

    const handleUserInput = (e) => updateItem({ ...item, [e.target.id]: e.target.value })


        return (
            <>
                <Box className="bg-gray-100 min-h-screen flex justify-center items-center">
                    <Container className="m-10 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                        <form className="space-y-3">
                            <h1 className="text-3xl font-bold text-center mb-6">Post New Item</h1>
                                <label htmlFor="name" className="label-form">Name</label>
                                <FormInput type="text" id="name" value={item.name} onChange={handleUserInput} />
                                <label htmlFor="description" className="label-form">Description</label>
                                <FormInput type="textarea" id="description" value={item.description} onChange={handleUserInput} className="w-full p-2 border border-gray-300 rounded-lg" rows="4" />
                                <label htmlFor="price" className="label-form">Price</label>
                               <FormInput type="text" id="price" value={item.price} onChange={handleUserInput} />
                                <label htmlFor="material" className="label-form">Material</label>
                               <FormInput type="text" id="material" value={item.material} onChange={handleUserInput} />
                                <label htmlFor="color" className="label-form">Color</label>
                               <FormInput type="text" id="color" value={item.color} onChange={handleUserInput} />
                                <label htmlFor="size" className="label-form">Size</label>
                               <FormInput type="text" id="size" value={item.size} onChange={handleUserInput}/>
                            <div className="block text-gray-700 leading-tight">
                                <div className="div-form-center">
                                Please Provide Up To Three Image URLS
                                </div>
                                <FormInput id="image1" type="url" onChange={(e) => handleImageInput1(e)} placeholder="first image" />
                                <FormInput id="image2" type="url" onChange={(e) => handleImageInput2(e)} placeholder="second image" />
                                <FormInput id="image3" type="url" onChange={(e) => handleImageInput3(e)} placeholder="third image" />
                                <div className="form-group">
                                    <p className="div-form-center">Categories</p>
                                    {categories.map((c) => (
                                        <FormInput
                                        key={`category-${c.id}`}
                                        type="checkbox"
                                        id={`category-${c.id}`}
                                        checked={chosenCategories.has(c.id)}
                                        onChange={() => handleCategoryChosen(c)}
                                        className="input-checkbox"
                                        >
                                {c.label}
                            </FormInput>
                        ))}
                        </div>
                                </div>
                            <Button type="submit" onClick={postCollectible}>
                                Post Item
                            </Button>
                        </form>
                    </Container>
                </Box>
            </>
        );
 }        