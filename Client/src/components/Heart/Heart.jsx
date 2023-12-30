import React from 'react'
import {AiFillHeart} from 'react-icons/ai'
import useAuthCheck from '../../hooks/useAuthCheck'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import userDetailsContext from '../../Context/userDetailsContext'
import { useContext } from 'react'
import { useMutation } from 'react-query'
import { updateFavourites } from '../../utils/common.js'
import { toFav } from '../../utils/api.js'
import { checkFavourites } from '../../utils/common.js'
import { useEffect } from 'react'

const Heart = ({id}) => {
    const [heartColor,setHeartColor] = useState("white")
    const{validateLogin} = useAuthCheck()
    const {user} = useAuth0()

const {
  userDetails: {favourites, token},
  setUserDetails,
} = useContext(userDetailsContext)


   useEffect(()=>{
      setHeartColor(()=> checkFavourites(id,favourites))
   },[favourites])

 const {mutate} = useMutation({
    
    mutationFn: ()=> toFav(id,user?.email,token),
    onSuccess: ()=>{
        setUserDetails((prev)=>(
            {
                ...prev,
                favourites: updateFavourites(id, prev.favourites)
            }
        ))
    }
})

  function handleLike(){
    if(validateLogin()){
        mutate()
        setHeartColor((prev)=> prev === "#fa3ef5" ? "white" : "#fa3ef5")
    }
  }

  return (
    <AiFillHeart size= {24} color={heartColor} onClick={(e)=>{
        e.stopPropagation()
        handleLike()
    }}/>
  )
}

export default Heart
