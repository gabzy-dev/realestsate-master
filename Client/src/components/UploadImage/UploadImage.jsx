import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import {AiOutlineCloudUpload} from "react-icons/ai"
import "./UploadImage.css"
import { Group } from '@mantine/core'
import { Button } from '@mantine/core'

const UploadImage = ({propertyDetails,setPropertyDetails,nextStep,prevStep}) => {
 const [imageUrl, setImageUrl] = useState(propertyDetails.image)
 const cloudinaryRef = useRef();
 const widgetRef = useRef()

 function handleNext (){
    setPropertyDetails((prev)=>({...prev, image: imageUrl}))
    nextStep();
 }

 useEffect(()=>{
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
{
    cloudName: "dca93reu9",
    uploadPreset: "ljsazc4q",
    maxFiles: 1
},
(err,result) => {
    if(result.event === "success"){
     setImageUrl(result.info.secure_url)
    }
}

    )
 },[])


    return (
    <div className='flexColCenter uploadWrapper'>

    {
        !imageUrl ?  (
            
                <div className='flexColCenter uploadZone'
                onClick={()=> widgetRef.current?.open()}>
                    <AiOutlineCloudUpload size={50} color = "grey"/>
                    <span> Upload Image</span>
                </div>
        ) : (
            <div className='uploadImage'
            onClick={()=> widgetRef.current?.open()}>
                  <img src={imageUrl} alt='#'/>
            </div>
        )}

<Group position='center' mt={"xl"}>
            <Button variant='default' onClick={prevStep}>Back</Button>
            <Button variant='default' onClick={handleNext} disabled={!imageUrl}>Next</Button>
         </Group>

    </div>
  );
};

export default UploadImage
