import React, { useState } from 'react'
import { useContext } from 'react'
import Searchbar from '../../components/Searchinput/Searchbar'
import "../Properties/Properties.css"
import useProperties from '../../hooks/useProperties'
import {PuffLoader} from 'react-spinners'
import Propertycard from '../../components/Propertycard/Propertycard'
import userDetailsContext from '../../Context/userDetailsContext'




const Favourites = () => {
  const {data, isError, isLoading} = useProperties()
  const[filter,setFilter] = useState("");
  const {userDetails : {favourites}} = useContext(userDetailsContext);

console.log(data);

 if(isError){
  return (
   <div className='wrapper'>
    <span>Error while fetching data</span>
   </div>
  )
 }

 if(isLoading){
  return(
    <div className="wrapper flexCenter" style={{height: "60vh"}}>
<PuffLoader height= "80" width= "80" radius= {1} color="#4066ff" aria-label= "puff-loading"/>
    </div>
  )
 }

  return (
    <div className='wrapper'>
      <div className='flexColCenter paddings innerWidth properties-container'>
      <Searchbar filter={filter} setFilter={setFilter}/>
      <div className='paddings flexCenter properties'>
       {
        data
        .filter((property)=> favourites?.includes(property.id))
        
        .filter((property)=>
         property.title.toLowerCase().includes(filter.toLowerCase()) ||
         property.city.toLowerCase().includes(filter.toLowerCase())  ||
         property.country.toLowerCase().includes(filter.toLowerCase())
         )
        .map((card,i)=>(<Propertycard card = {card} key ={i}/>))
       
       }
      </div>
      </div>
    </div>
  )
}

export default Favourites;
