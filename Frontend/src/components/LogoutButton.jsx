import { Button } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '../atoms/userAtom.js'
import { HiOutlineLogout } from "react-icons/hi";

const LogoutButton = () => {

    const setUser = useSetRecoilState(userAtom);
    const handleLogout = async () => {
    try {
        
        const res = await fetch("/api/users/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
        });
        
        const data = await res.json();
        
        if (data.error) {
            alert(data.error);
        } else {
            localStorage.removeItem("user-info");
            window.location.reload();
            setUser(null);
      }
    } catch (error) {
      console.log(error);
    }
    };
  return (
    <Button 
    position={"fixed"}
    top={"30px"}
    right={"30px"}
    size={"md"}
    onClick={handleLogout}
    >
      <HiOutlineLogout size={20}/> 
    </Button>
  )
}

export default LogoutButton