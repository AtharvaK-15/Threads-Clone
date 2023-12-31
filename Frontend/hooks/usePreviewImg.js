import { useState } from "react";

const usePreviewImg = () => {
    const [imgURL, setImgURL] = useState(null);
    const handleImgChange = (e)=>{
        const file = e.target.files[0];
        // console.log(file);
        if(file){
            const reader = new FileReader();
            reader.onloadend = ()=>{
                setImgURL(reader.result);
            }
            reader.readAsDataURL(file);
        }else{
            setImgURL(null);
        }
    }  
    // console.log(imgURL);
    return (
    {handleImgChange, imgURL}
  )
}

export default usePreviewImg