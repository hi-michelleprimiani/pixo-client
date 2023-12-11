import { useEffect, useState } from "react"
import { getCollectibleById } from "../managers/CollectibleManager"
import { getAllCategories } from "../managers/CategoriesManager"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button, Container } from "@radix-ui/themes"

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
    const [categories, setCategories] = useState([]);
    const [chosenCategories, setChosenCategories] = useState(new Set());

    useEffect(() => {
        const fetchCollectibleData = async () => {
            const res = await getCollectibleById(itemId);
            setCollectibleData({
                name: res.name || "",
                description: res.description || "",
                price: res.price || "",
                material: res.material || "",
                color: res.color || "",
                size: res.size || "",
              });
            setImages(res.images.map(img => img.img_url));
    
            const categoryIds = new Set(
                res.categories.map(cat => cat.id).filter(id => id !== undefined)
              );
              setChosenCategories(categoryIds);
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
    
        const responseBody = await response.json(); // Get the response body
    
        if (response.ok) {
            console.log("Collectible updated successfully:", responseBody); // Log success response
            navigate("/");
        } else {
            console.error("Failed to update collectible:", responseBody); // Log error response
        }
    };
    

    return (<><div>
        <Box className="bg-gray-100 min-h-screen flex justify-center items-center">
                    <Container className="m-10 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
                        <form className="space-y-4">
                            <h1 className="text-3xl font-bold text-center mb-6">Edit Item</h1>
                            <fieldset className="space-y-2">
                                <label htmlFor="name" className="block text-lg font-bold text-gray-700 leading-tight">Name</label>
                                <input
                                    id="name"
                                    autoComplete="off"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={collectibleData?.name}
                                    onChange={handleUserInput}
                                />
                            </fieldset>
                            <fieldset className="space-y-2">
                                <label htmlFor="description" className="block text-lg font-bold text-gray-700 leading-tight">Description</label>
                                <textarea
                                    id="description"
                                    autoComplete="off"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    rows="4"
                                    value={collectibleData?.description}
                                    onChange={handleUserInput}
                                ></textarea>
                            </fieldset>
                            <fieldset className="space-y-2">
                                <label htmlFor="price" className="block text-lg font-bold text-gray-700 leading-tight">Price</label>
                                <input
                                    id="price"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Please enter a valid price (e.g., 120.00 or 10.00)"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={collectibleData?.price}
                                    onChange={handleUserInput}
                                />
                            </fieldset>
                            <fieldset className="space-y-2">
                                <label htmlFor="material" className="block text-lg font-bold text-gray-700 leading-tight">Material</label>
                                <input
                                    id="material"
                                    autoComplete="off"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={collectibleData?.material}
                                    onChange={handleUserInput}
                                />
                            </fieldset>
                            <fieldset className="space-y-2">
                                <label htmlFor="color" className="block text-lg font-bold text-gray-700 leading-tight">Color</label>
                                <input
                                    id="color"
                                    autoComplete="off"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={collectibleData?.color}
                                    onChange={handleUserInput}
                                />
                            </fieldset>
                            <fieldset className="space-y-2">
                                <label htmlFor="size" className="block text-lg font-bold text-gray-700 leading-tight">Size</label>
                                <input
                                    id="size"
                                    autoComplete="off"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                    value={collectibleData?.size}
                                    onChange={handleUserInput}
                                />
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
                                        value={images[0]}
                                        onChange={handleImageInput}
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
                                        value={images[1]}
                                        onChange={handleImageInput}
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
                                        value={images[2]}
                                        onChange={handleImageInput}
                                    />
                                </fieldset>
                            </div>
                            <fieldset className="space-y-2">
                                <div className="form-group">
                                    <p className="text-1xl font-bold text-center mb-6">Categories</p>
                                    {categories.map((c) => (
                                        <div key={`category-${c.id}`} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={`category-${c.id}`}
                                            value={c.id}
                                            className="appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-green checked:border-transparent focus:outline-none"
                                            onChange={() => handleCategoryChosen(c.id)}
                                        />
                                        <label htmlFor={`category-${c.id}`} className="text-lg text-gray-700">{c.label}</label>
                                        </div>
                                    ))}
                                </div>
                            </fieldset>
                            <Button type="submit" onChange={handleSubmit}>
                                Update Item
                            </Button>
                        </form>
                    </Container>
                </Box>
                </div></>)
}