import React, { useState } from 'react'
import Searchbar from '../../components/Searchinput/Searchbar'
import "./Properties.css"
import useProperties from '../../hooks/useProperties'
import {PuffLoader} from 'react-spinners'
import Propertycard from '../../components/Propertycard/Propertycard'
const Properties = () => {
  const {data, isError, isLoading} = useProperties()
  const[filter,setFilter] = useState("");

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
        data.filter((property)=>
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

export default Properties
