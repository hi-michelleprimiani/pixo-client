import { useEffect, useState } from "react"
import { getAllCollectiblesAndUser } from "../managers/CollectibleManager"
import { getPixoUserById } from "../managers/PixoUserManager"
import { Avatar, Box, Card, Container, Flex, Grid, Inset, Text } from "@radix-ui/themes"



export const ProfileView = ( {userId}) => {
    const [getUser, setUser] = useState([])


    useEffect(() => {
        getPixoUserById(userId).then(setUser)
    }, [userId])


    return (<>
    <Container className="lg (1024px)">
        <Box size={2} className="flex">
        <Card style={{ maxWidth: 600 }}>
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
            <Text as="div" size="3">
            {getUser.bio}
            </Text>
            </Box>
        </Flex>
        </Card>
        </Box>

        <Grid columns={4} gap={4} width="auto">
        {getUser.collectible?.map((item) => (
            <Card key={item.id}>  
            <Inset clip="padding-box" side="top" pb="current">
            <div key={item.id}> 
                    <img
                    src={item.collectible?.images[0].img_url}
                    alt={item.name}/>
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <p>${item.price}</p>
                </div>
            </Inset>
            </Card>
            ))}
            </Grid>
    </Container>
        </>)
}