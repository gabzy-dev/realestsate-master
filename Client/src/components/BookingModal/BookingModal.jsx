import React, { useContext } from 'react'
import {Modal,Button} from "@mantine/core"
import{DatePicker} from "@mantine/dates"
import { useState } from 'react'
import { useMutation } from 'react-query'
import userDetailsContext from '../../Context/userDetailsContext.js'
import { bookVisit } from '../../utils/api'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'




const BookingModal = ({opened,email,propertyId,onClose}) => {
  
  const[value,setValue] = useState(null)
  const {userDetails : {token}, setUserDetails} = useContext(userDetailsContext)
  

    function handleBookingSuccess () {
      toast.success("you have sucessfully booked your visit",{
        position: "bottom-right",
      });
      setUserDetails((prev)=>({
        ...prev,
        bookings: [
          ...prev.bookings,
          {
            id: propertyId, date: dayjs(value).format('DD/MM/YYYY')
          }
        ]
      }))
    }; 

  const {mutate, isLoading} = useMutation({
    mutationFn: ()=> bookVisit(value,propertyId,email,token),
    onSuccess: ()=> handleBookingSuccess(),
    onError: ({response}) => toast.error(response.data.message),
    onSettled: ()=> onClose(false)
  })

  return (
    <Modal
    opened={opened}
    onClose={onClose}
    title = "select your date of visit" 
    centered
    >
        <div className='flexColCenter' style={{gap: "1rem"}}>
           <DatePicker value={value} onChange={setValue} minDate={new Date()}/>
           <Button disabled ={!value || isLoading} onClick={()=> mutate()}>
            Book a visit
           </Button>
           
        </div>

    </Modal>
  )
}

export default BookingModal;
