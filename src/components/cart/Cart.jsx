import { useEffect, useState } from "react";
import { deleteCartItem, getCartByUser } from "../managers/CartManager";
import { useNavigate } from "react-router-dom";
import {
  AspectRatio,
  Button,
  Card,
  Container,
  Flex,
  Inset,
} from "@radix-ui/themes";
export const Cart = ({ token, userId }) => {
  const [cartData, setCartData] = useState(null);
  const [cartId, setCartId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCartByUser().then((data) => {
      setCartData(data);
      setCartId(data.id);
    });
  }, []);

  const totalPrice =
    cartData?.items?.reduce((total, item) => {
      const pricePerItem = parseFloat(item.collectible.price);
      const taxPerItem = pricePerItem * 0.04;
      const totalCostPerItem = (pricePerItem + taxPerItem) * item.quantity;
      return total + totalCostPerItem;
    }, 0) || 0;

  const handlePurchaseClick = async () => {
    if (cartId) {
      try {
        const response = await fetch(
          `https://clownfish-app-2o2rw.ondigitalocean.app/cart/${cartId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
            body: JSON.stringify({ paid: true }),
          }
        );

        if (response.ok) {
          alert(
            "Your purchase was complete. You can now view your order in your Purchase History"
          );
          navigate(`/profile/${userId}`);
        } else {
          console.error("Purchase failed", response);
        }
      } catch (error) {
        console.error("Network error", error);
      }
    } else {
      console.log("No cart ID available");
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
    <Container className="lg:container lg:mx-auto px-4">
      {cartData && cartData.items && cartData.items.length > 0 ? (
        <>
          <div className="text-2xl font-bold mb-6">
            Your Cart Has {cartData.items.length} Items
          </div>
          {cartData.items.map((item) => (
            <Card
              key={item.collectible.id}
              className="cursor-pointer hover:shadow-lg transition-shadow flex mb-8"
              onClick={() => {
                navigate(`/item/${item.collectible.id}`);
              }}
            >
              <Flex align="center" className="w-full">
                <div className="flex-none w-[18%]">
                  <AspectRatio ratio={1 / 1}>
                    {item.collectible.images &&
                      item.collectible.images.length > 0 && (
                        <img
                          src={item.collectible.images[0].img_url}
                          alt={item.collectible.name}
                          className="block object-cover w-full h-full rounded-xl"
                        />
                      )}
                  </AspectRatio>
                </div>
                <div className="flex-grow p-5 w-[82%]">
                  <h2 className="text-xl font-bold">{item.collectible.name}</h2>
                  <p>
                    Price: ${item.collectible.price} + Tax $
                    {(item.collectible.price * item.quantity * 0.04).toFixed(2)}
                  </p>
                  <Button
                    variant="soft"
                    color="red"
                    className="absolute bottom-4 right-4"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDeleteItem(item.id);
                    }}
                  >
                    Remove Item From Cart
                  </Button>
                </div>
              </Flex>
            </Card>
          ))}
          <div className="mb-20">
            <Button size="3" onClick={handlePurchaseClick}>
              Purchase
            </Button>
            <div className="text-2xl font-bold mb-6 float-right">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </div>
        </>
      ) : (
        <div className="text-2xl font-bold mb-6">
          You have no items currently in your cart
        </div>
      )}
    </Container>
  );
};
