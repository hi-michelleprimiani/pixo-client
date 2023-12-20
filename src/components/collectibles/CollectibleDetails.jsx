import { useEffect, useState } from "react";
import { getCollectibleById } from "../managers/CollectibleManager";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Button, Box, Container, Tabs, Text, Flex, TextArea } from "@radix-ui/themes";
import { HeartFilledIcon, AvatarIcon } from "@radix-ui/react-icons";
import * as Popover from '@radix-ui/react-popover';

export const CollectibleDetails = () => {
  const { itemId } = useParams();
  const [chosenCollectible, setChosenCollectible] = useState({});
  const [sellerUserId, setSellerUserId] = useState(null);
  const loggedInUserId = localStorage.getItem("user_id");
  const [messageText, setMessageText] = useState(""); // Add this line to manage message text
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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

  const isOwnCollectible = sellerUserId == parseInt(loggedInUserId);

  const addItemToCart = async (evt) => {
    evt.preventDefault();
    await fetch(`http://localhost:8000/cartitems`, {
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
    if (messageText.trim() !== "") {
      const newMessage = {
        sender: parseInt(loggedInUserId),
        receiver: sellerUserId,
        text: messageText,
      };

      try {
        const response = await fetch(`http://localhost:8000/messages`, {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("auth_token")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        });

        if (response.ok) {
          setMessageText(""); // Clear the message input
          setShowSuccessMessage(true); // Show success message
          setTimeout(() => setShowSuccessMessage(false), 3000); // Hide the message after 3 seconds
        } else {
          throw new Error("Failed to send message");
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };



  return (
    <Container className="lg (1024px)">
      <Box size={2} className="flex justify-between mb-28">
        <Box className="flex flex-col items-center" style={{ width: "60%" }}>
          {chosenCollectible.images &&
            chosenCollectible.images.length > 0 &&
            chosenCollectible.images.map((image) => (
              <img
                key={image.id}
                src={image.img_url}
                alt={chosenCollectible.name}
                style={{
                  display: "block",
                  objectFit: "cover",
                  width: "60%",
                  height: "100%",
                  backgroundColor: "var(--gray-5)",
                  margin: "10px",
                }}
              />
            ))}
        </Box>
        <Box className="flex flex-col" style={{ width: "40%" }}>
          <div className="mb-4">
            <h1 className="text-4xl font-bold mb-4">
              {chosenCollectible.name}
            </h1>
            <div className="text-3xl font-bold mb-4">
              ${chosenCollectible.price}
            </div>
            <div className="whitespace-pre-wrap">
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
                <p>
                  {chosenCollectible.seller?.user.first_name}{" "}
                  {chosenCollectible.seller?.user.last_name}
                </p>
              </div>
            </div>
            {!isOwnCollectible && (
              <div>

                <Popover.Root>
                  <Popover.Trigger>
                    <Button variant="soft">
                      Message Seller
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content style={{ width: 360, zIndex: 1000, backgroundColor: 'white' }}>
                    <Flex gap="3">
                      <Box grow="1">
                        <Text>Message</Text>
                        <TextArea
                          placeholder="Write a message..."
                          value={messageText} // Set the value from state
                          onChange={(e) => setMessageText(e.target.value)}
                          style={{ height: 80 }}
                        />
                        <Flex gap="3" mt="3" justify="between">
                          <Flex align="center" gap="2" asChild></Flex>
                          <Popover.Close>
                            <Button size="1" onClick={handleSendMessage}>Send</Button>
                          </Popover.Close>
                        </Flex>
                      </Box>
                    </Flex>
                  </Popover.Content>
                </Popover.Root>

                {/* <Button variant="outline">
                  <AvatarIcon />
                  Message Seller
                </Button> */}
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
          <div className="">
            <Tabs.Root defaultValue="materials">
              <Tabs.List>
                <Tabs.Trigger value="materials">Materials</Tabs.Trigger>
                <Tabs.Trigger value="size">Size</Tabs.Trigger>
                <Tabs.Trigger value="color">Color</Tabs.Trigger>
              </Tabs.List>
              <Box px="4" pt="3" pb="2">
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
