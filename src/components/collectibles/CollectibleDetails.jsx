import { useEffect, useState } from "react";
import { getCollectibleById } from "../managers/CollectibleManager";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Container,
  Tabs,
  Text,
  Flex,
  TextArea,
} from "@radix-ui/themes";
import { HeartFilledIcon, AvatarIcon } from "@radix-ui/react-icons";
import * as Popover from "@radix-ui/react-popover";

export const CollectibleDetails = ({ userId }) => {
  const { itemId } = useParams();
  const [chosenCollectible, setChosenCollectible] = useState({});
  const [sellerUserId, setSellerUserId] = useState(null);
  const [messageText, setMessageText] = useState("");
  const initialItemState = {
    collectible: itemId,
    quantity: 1,
  };
  const navigate = useNavigate();

  useEffect(() => {
    getCollectibleById(itemId).then((data) => {
      setChosenCollectible(data);
      setSellerUserId(data.seller?.id);
    });
  }, [itemId]);

  // To determine whether Add to Cart/Add To Favorites/Message user buttons should be displayed
  const isOwnCollectible = sellerUserId === parseInt(userId);

  const addItemToCart = async (evt) => {
    evt.preventDefault();
    await fetch(`https://clownfish-app-2o2rw.ondigitalocean.app/cartitems`, {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("auth_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialItemState),
    });
    navigate("/cart");
  };

  const handleAvatarClick = () => {
    navigate(`/profile/${chosenCollectible.seller?.id}`);
  };

  const handleSendMessage = async () => {
    const newMessage = {
      sender: parseInt(userId),
      receiver: sellerUserId,
      text: messageText,
    };

    try {
      const response = await fetch(
        `https://clownfish-app-2o2rw.ondigitalocean.app/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        }
      );

      if (response.ok) {
        setMessageText(""); // Clear the message input
        navigate("/messages");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Container className="lg (1024px)">
      <Box size={2} className="flex justify-between mb-28">
        <Box className="flex flex-col items-center w-3/5">
          {chosenCollectible.images &&
            chosenCollectible.images.length > 0 &&
            chosenCollectible.images.map((image) => (
              <img
                key={image.id}
                src={image.img_url}
                alt={chosenCollectible.name}
                className="block object-cover w-3/5 h-auto m-2.5 rounded-3xl"
              />
            ))}
        </Box>
        <Box className="flex flex-col w-2/5">
          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4">
              {chosenCollectible.name}
            </h1>
            <div className="text-3xl font-bold mb-4">
              ${chosenCollectible.price}
            </div>
            <div className="whitespace-pre-wrap max-h-[700px] overflow-auto">
              {chosenCollectible.description}
            </div>
          </div>
          <div className="flex items-center mb-4 justify-between">
            <div className="flex items-center">
              <Avatar
                onClick={handleAvatarClick}
                fallback={chosenCollectible.seller?.user.first_name}
                src={chosenCollectible.seller?.img_url}
              />
              <div className="ml-2">
                <p>{chosenCollectible.seller?.user?.username}</p>
              </div>
              <Button
                variant="soft"
                onClick={() => navigate(`/edit/${chosenCollectible.id}`)}
              >
                Edit Item
              </Button>
            </div>
            {!isOwnCollectible && (
              <div>
                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="soft">Message Seller</Button>
                  </Popover.Trigger>
                  <Popover.Content className="w-90 z-50 bg-white p-2.5 border border-light-gray rounded-lg m-2.5">
                    <Flex gap="3">
                      <Box grow="1">
                        <Text>
                          Your message to{" "}
                          {chosenCollectible.seller?.user?.first_name} at{" "}
                          {chosenCollectible.seller?.user?.username}
                        </Text>
                        <TextArea
                          placeholder="Write a message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="h-24 w-80 mb-2"
                        />
                        <Popover.Close>
                          <Button size="1" onClick={handleSendMessage}>
                            Send
                          </Button>
                        </Popover.Close>
                      </Box>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>
              </div>
            )}
          </div>

          {!isOwnCollectible && (
            <div className="mb-2 text-center flex flex-row justify-center">
              <Button onClick={addItemToCart}>Add To Cart</Button>
              <div className="ml-5">
                <Button>
                  <HeartFilledIcon />
                  Add To Favorites
                </Button>
              </div>
            </div>
          )}
          <div>
            <Tabs.Root defaultValue="materials">
              <Tabs.List>
                <Tabs.Trigger value="materials">Materials</Tabs.Trigger>
                <Tabs.Trigger value="size">Size</Tabs.Trigger>
                <Tabs.Trigger value="color">Color</Tabs.Trigger>
              </Tabs.List>
              <Box px="3" pt="3" pb="2">
                <Tabs.Content value="materials">
                  <Text size="3">{chosenCollectible.material}</Text>
                </Tabs.Content>

                <Tabs.Content value="size">
                  <Text size="3">{chosenCollectible.size}</Text>
                </Tabs.Content>

                <Tabs.Content value="color">
                  <Text size="3">{chosenCollectible.color}</Text>
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </div>
        </Box>
      </Box>
    </Container>
  );
};
