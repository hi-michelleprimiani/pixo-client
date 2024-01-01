import { useEffect, useState } from "react";
import { deleteCartItem, getCartByUser } from "../managers/CartManager";
import { useNavigate } from "react-router-dom";
import {
  AspectRatio,
  Avatar,
  Button,
  Card,
  Container,
  Flex,
  Inset,
} from "@radix-ui/themes";

export const Cart = ( {token, userId}) => {
  const [cartData, setCartData] = useState(null);
  const [cartId, setCartId] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    getCartByUser().then(data => {
      setCartData(data);
      setCartId(data.id); 
    });
  }, []);


  const totalPrice = cartData?.items?.reduce((total, item) => {
    const pricePerItem = parseFloat(item.collectible.price);
    const taxPerItem = pricePerItem * 0.04;
    const totalCostPerItem = (pricePerItem + taxPerItem) * item.quantity;
    return total + totalCostPerItem;
  }, 0) || 0;
  
const handlePurchaseClick = async () => {
  if (cartId) {
    try {
      const response = await fetch(`http://localhost:8000/cart/${cartId}`, { // Use the cartId from the state
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({ paid: true }),
      });

      if (response.ok) {
        console.log('Purchase successful');
        navigate(`/profile/${userId}`);
        // Handle successful purchase here
      } else {
        console.error('Purchase failed', response);
        // Handle errors here
      }
    } catch (error) {
      console.error('Network error', error);
      // Handle network errors here
    }
  } else {
    console.log('No cart ID available');
  }
};


  const handleDeleteItem = async (cartItemId) => {
    try {
      await deleteCartItem(cartItemId);
      const updatedCartData = await getCartByUser();
      setCartData(updatedCartData);
    } catch (error) {
      console.error("An error occurred while deleting the item:", error);
    }
  };

  return (
    <Container className="lg (1024px)">
      <div className="text-2xl font-bold mb-6">
        Your Cart Has {cartData?.items?.length} Items
      </div>
      {cartData &&
        cartData.items &&
        cartData.items.map((item) => (
          <Card
            key={item.collectible.id}
            size="3"
            className="cursor-pointer hover:shadow-lg transition-shadow flex mb-6 max-w-3xl max-h-40"
            onClick={() => {
              navigate(`/item/${item.collectible.id}`);
            }}
          >
            <Flex align="center">
              <div className="flex-none w-1/5">
                  <AspectRatio ratio={1 / 1}>
                    {item.collectible.images &&
                      item.collectible.images.length > 0 && (
                        <Avatar
                          src={item.collectible.images[0].img_url}
                          alt={item.collectible.name}
                          radius="small"
                          size="8"
                        />
                      )}
                  </AspectRatio>
              </div>
              <div className="flex-grow p-5">
                <h2 className="text-xl font-bold">{item.collectible.name}</h2>
                <p>Price: ${item.collectible.price} + Tax ${ (item.collectible.price * item.quantity * 0.04).toFixed(2) }</p>
                <div className="float-right">
                  <Button
                    variant="soft"
                    color="red"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteItem(item.id);
                    }}
                  >
                    Remove Item From Cart
                  </Button>
                </div>
              </div>
            </Flex>
          </Card>
        ))}
      <div>
        <Button size="3" onClick={handlePurchaseClick}>Purchase</Button>
        <div className="text-2xl font-bold mb-20 float-right">
        Total: ${totalPrice.toFixed(2)}{" "}
        </div>
      </div>

    </Container>
  );
};
