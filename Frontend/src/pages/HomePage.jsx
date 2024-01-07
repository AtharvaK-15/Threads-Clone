import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getFeedPosts = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/posts/feed")
                const data = await res.json()
                console.log(data)
            } catch (error) {
                console.log(error)
                alert("Error fetching posts")
            }finally {
                setLoading(false)
            }
        }
        getFeedPosts()
    }, [])
    return (
        <Link to={"/kamadotanjiro"}>
            <Flex w={"full"} justifyContent={"center"}>
                <Button mx={"auto"}>Visit Profile Page</Button>
            </Flex>
        </Link>
        )}

export default HomePage;