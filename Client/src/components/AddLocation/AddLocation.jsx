import React from 'react'
import {useForm} from "@mantine/form"
import { validateString } from '../../utils/common'
import useCountries from '../../hooks/useCountries'
import {Button, Select, TextInput } from '@mantine/core'
import { Group } from '@mantine/core'
import Map from '../Map/Map'


const AddLocation = ({propertyDetails,setPropertyDetails,nextStep}) => {
   const {getAll} = useCountries()

    const form = useForm({
        initialValues: {
            country: propertyDetails?.country,
             city: propertyDetails?.city,
             address: propertyDetails?.address
        },
        validate: {
            country: (value) => validateString(value),
            city: (value) => validateString(value),
            address: (value) => validateString(value)
        }
    })

   

    const {country,city,address} = form.values
     
    function handleSubmit(){
         const{hasErrors} = form.validate();
         if(!hasErrors) {
            setPropertyDetails((prev)=>({...prev, city: city, address: address,country: country}))
           nextStep()
        }
    }
  return (
    <form onSubmit={(e)=>{
    e.preventDefault();
    handleSubmit();
    }}>
        {/*left*/}
        <div className='flexCenter'
        style={{
            justifyContent: "space-between",
            gap: "3rem",
            marginTop: "3rem",
            flexDirection: "row",
        }}>

            <div className='flexColStart'>
                <Select 
                w= {"100%"}
                withAsterisk
                label = "country"
                clearable
                searchable
                data = {getAll()}
                {
                 ...form.getInputProps("country", {type: "input"})
                }/>
                <TextInput
                w={"100%"}
                withAsterisk
                label="city"
                {
                    ...form.getInputProps("city", {type: "input"})
                }
                />
                  <TextInput
                w={"100%"}
               withAsterisk
                label="address"
                {
                    ...form.getInputProps("address", {type: "input"})
                }
                />
            </div> 
 

        {/*right*/}

        <div style={{flex: 1}}>
            <Map
            address={address}
            city={city}
            country={country}/>

        </div>
        </div>

         
         <Group position='center' mt={"xl"}>
            <Button type='submit'>Next step</Button>
         </Group>

    </form>
  )
}

export default AddLocation
