import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/spinner";

const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getFeedPosts = async () => {
            setLoading(true)
            try {
                const res = await fetch("/api/posts/feed/"+localStorage.getItem("user-info")._id)
                const data = await res.json()
                if(data.error){
                    console.log(data.error)
                    alert("Error fetching posts")
                }
                console.log(data)
                setPosts(data)
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
            <>
                {loading &&(
                    <Flex justify="center" >
                        <Spinner size="xl"/>
                    </Flex>
                )}
                {!loading && posts.length === 0 && (
                    <h1>Follow some users to see feed posts</h1>
                )}
            </>
        )}

export default HomePage;