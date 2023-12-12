import { useEffect, useState } from "react"
import { getCollectibleById } from "../managers/CollectibleManager"
import { getAllCategories } from "../managers/CategoriesManager"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button, Container } from "@radix-ui/themes"
import { FormInput } from "../utils/FormInput"

export const EditCollectibleForm = ({userId}) => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [collectibleData, setCollectibleData] = useState({
        name: "",
        description: "",
        price: "",
        material: "",
        color: "",
        size: "",
      });
    const [images, setImages] = useState(["", "", ""]);
    const [categories, setCategories] = useState([{ id: 1, name: "Art & Collectibles"}, {id: 2, name: "Home & Living"}]);
    const [chosenCategories, setChosenCategories] = useState(new Set());

    useEffect(() => {
        const fetchCollectibleData = async () => {
            const res = await getCollectibleById(itemId);
            setCollectibleData({
                name: res.name,
                description: res.description,
                price: res.price,
                material: res.material,
                color: res.color,
                size: res.size
              });
            setImages(res.images.map(img => img.img_url));
            setChosenCategories(new Set(res.categories));
        };
        fetchCollectibleData();
    }, [itemId, categories]);


    useEffect(() => {
        getAllCategories().then(setCategories)
    }, [])

    const handleUserInput = (e) => {
        setCollectibleData({ ...collectibleData, [e.target.id]: e.target.value });
    };

    const handleImageInput = (e) => {
        const newImages = [...images];
        const index = parseInt(e.target.id.replace("image", "")) - 1;
        newImages[index] = e.target.value;
        setImages(newImages);
    };

    const handleCategoryChosen = (categoryId) => {
        setChosenCategories(prevCategories => {
            const newCategories = new Set(prevCategories);
            if (newCategories.has(categoryId)) {
                newCategories.delete(categoryId);
            } else {
                newCategories.add(categoryId);
            }
            return newCategories;
        });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const imagesPayload = images
            .filter(url => url !== "") // Filter out empty URLs
            .map(url => ({ img_url: url })); // Map to required format
    
        const updatedData = {
            ...collectibleData,
            images: imagesPayload,
            categories: Array.from(chosenCategories)
        };
    
        console.log("Submitting the following data:", updatedData); // Log the data being submitted
    
        const response = await fetch(`http://localhost:8000/collectibles/${itemId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("auth_token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });
    
        if (response.ok) {
            navigate(`/item/${itemId}`); 
        } else {
            try {
                const responseBody = await response.json();
                console.error("Failed to update collectible:", responseBody);
            } catch (error) {
                console.error("Failed to update collectible, and error parsing the response body:", error);
            }
        }
    };
    
    

    return (<><div>
        <Box className="bg-gray-100 min-h-screen flex justify-center items-center">
                    <Container className="m-10 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                        <form className="space-y-4">
                            <h1 className="text-3xl font-bold text-center mb-6">Edit Item</h1>
                                <label htmlFor="name" className="label-form">Name</label>
                                <FormInput id="name" type="text" value={collectibleData?.name} onChange={handleUserInput}/>
                                <label htmlFor="description" className="label-form">Description</label>
                                <FormInput id="description" type="textarea" value={collectibleData?.description} onChange={handleUserInput}/>
                                <label htmlFor="price" className="label-form">Price</label>
                                <FormInput id="price" type="text" value={collectibleData?.price} onChange={handleUserInput}/>
                                <label htmlFor="material" className="label-form">Material</label>
                                <FormInput id="material" type="text" value={collectibleData?.material} onChange={handleUserInput}/>
                                <label htmlFor="color" className="label-form">Color</label>
                                <FormInput id="color" type="text" value={collectibleData?.color} onChange={handleUserInput}/>
                                <label htmlFor="size" className="label-form">Size</label>
                                <FormInput id="size" type="text" value={collectibleData?.size} onChange={handleUserInput}/>
                                <div className="block text-gray-700 leading-tight">
                                <div className="div-form-center">
                                Please Provide Up To Three Image URLS
                                </div>
                                <FormInput id="image1" type="url" onChange={handleImageInput} placeholder="first image" value={images[0]}/>  
                                <FormInput id="image2" type="url" onChange={handleImageInput} placeholder="second image" value={images[1]}/>  
                                <FormInput id="image3" type="url" onChange={handleImageInput} placeholder="third image" value={images[2]}/>  
                                <div className="form-group">
                                    <p className="div-form-center">Categories</p>
                                    {categories.map((category) => (
                                        <FormInput
                                        key={`category-${category.id}`}
                                        type="checkbox"
                                        id={`category-${category.id}`}
                                        checked={chosenCategories.has(category.id)}
                                        onChange={() => handleCategoryChosen(category.id)}
                                        children={category.label}
                                        className="input-checkbox"
                                        />
                                        ))}
                                        </div>
                                </div>
                            <Button type="submit" onClick={handleSubmit}>
                                Update Item
                            </Button>
                        </form>
                    </Container>
                </Box>
                </div></>)
}