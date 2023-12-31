import { useEffect, useState } from "react";
import { getPixoUserAndCollectiblesById } from "../managers/PixoUserManager";
import {
  AlertDialog,
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Inset,
  Popover,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCollectible } from "../managers/CollectibleManager";
import { getPaidCart } from "../managers/CartManager";
import { PurchaseHistory } from "./PurchaseHistory";

export const ProfileView = () => {
  const { userId } = useParams();
  const [getUser, setUser] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem("user_id");

  useEffect(() => {
    getPixoUserAndCollectiblesById(userId).then(setUser);
    getPaidCart().then(setPurchaseHistory);
  }, [userId]);

  const handleDeleteCollectible = async (itemId) => {
    try {
      const response = await deleteCollectible(itemId);
    } catch (error) {
      console.error("An error occurred while deleting the item:", error);
    }
    setUser((prevUser) => ({
      ...prevUser,
      collectible: prevUser.collectible.filter((item) => item.id !== itemId),
    }));
  };

  return (
    <>
      <Container>
        <div className="flex justify-center items-center h-full">
          <Card className="flex mb-20 max-w-4xl">
            <Flex gap="3" align="center">
              <Avatar
                size="8"
                src={getUser.img_url}
                radius="full"
                fallback={getUser.user?.full_name}
              />
              <Box>
                <Text as="div" size="7" weight="bold">
                  {getUser.user?.full_name}
                </Text>
                <Text as="div" size="2" color="gray">
                  {getUser.user?.username} - {getUser.location}
                </Text>
                <Text as="div" size="3" className="whitespace-pre-wrap">
                  {getUser.bio}
                </Text>
              </Box>
            </Flex>
          </Card>
        </div>

        <div className="text-xl font-bold mb-3">Current Listed Items</div>
        {getUser.collectible && getUser.collectible.length > 0 ? (
          <Grid columns="4" gap="4" width="auto">
            {getUser.collectible?.map((item) => (
              <Card
                key={item.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <Inset clip="padding-box" side="top" pb="current">
                  <AspectRatio ratio={1 / 1}>
                    {item.images.length > 0 && (
                      <img
                        src={item.images[0].img_url}
                        onClick={() => navigate(`/item/${item.id}`)}
                        alt={item.name}
                        style={{
                          display: "block",
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    )}
                  </AspectRatio>
                </Inset>
                <div className="text-xl font-bold">{item.name}</div>
                <p className="text-gray-600">${item.price}</p>
                {userId === loggedInUserId && (
                  <div className="mt-2">
                    <Button
                      variant="soft"
                      onClick={() => navigate(`/edit/${item.id}`)}
                    >
                      Edit
                    </Button>
                    <AlertDialog.Root>
                      <AlertDialog.Trigger>
                        <Button
                          className="float-right"
                          variant="soft"
                          color="red"
                        >
                          Delete
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content style={{ maxWidth: 450 }}>
                        <AlertDialog.Title>Delete Item</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          Are you sure? This action cannot be undone.
                        </AlertDialog.Description>
                        <Flex gap="3" mt="4" justify="end">
                          <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                              Cancel
                            </Button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <Button
                              variant="solid"
                              color="red"
                              onClick={() => handleDeleteCollectible(item.id)}
                            >
                              Delete
                            </Button>
                          </AlertDialog.Action>
                        </Flex>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                  </div>
                )}
              </Card>
            ))}
          </Grid>
        ) : (
          <p>You have not listed any items yet.</p>
        )}
        {userId === loggedInUserId && (
          <PurchaseHistory purchaseHistory={purchaseHistory} />
        )}
      </Container>
    </>
  );
};
