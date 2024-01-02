import { useEffect, useState } from "react"
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import { useParams } from "react-router-dom"

const UserPage = () => {
  const [user, setUser] = useState(null)
  const { username } = useParams()
  useEffect(()=>{
    const getUser = async () =>{
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data = await res.json()
        console.log(data)
        if(data.error){
          alert(data.error)
        }
        setUser(data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  },[username])

  return (
    <>
    <UserHeader user={user}/>
    <UserPost likes={1200} replies={480} postTitle="This is my first Post!" postImg="/post1.jpg"/>
    <UserPost likes={1123} replies={508} postTitle="This is my first Post!" postImg="/post1.jpg"/>
    <UserPost likes={1234} replies={690} postTitle="This is my first Post!" postImg="/post1.jpg"/>
    </>
    )
}

export default UserPage