import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"

const UserPage = () => {
  return (
    <>
    <UserHeader />
    <UserPost likes={1200} replies={480} postTitle="This is my first Post!" postImg="/post1.jpg"/>
    <UserPost likes={1123} replies={508} postTitle="This is my first Post!" postImg="/post1.jpg"/>
    <UserPost likes={1234} replies={690} postTitle="This is my first Post!" postImg="/post1.jpg"/>
    </>
    )
}

export default UserPage