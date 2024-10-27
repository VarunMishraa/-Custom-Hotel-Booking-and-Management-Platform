import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from '../components/Success'
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';
function Bookingscreen() {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const { roomid,fromdate,todate } = useParams();
  const startDate = moment(fromdate, 'DD-MM-YYYY');
const endDate = moment(todate, 'DD-MM-YYYY');
const totalDays = endDate.diff(startDate, 'days')+1;
console.log('Difference in days:', totalDays);
const [totalAmount,setTotalAmount]=useState([0]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.post("/api/rooms/getroombyid", { roomid })).data;
        setRoom(data);
        if (data.rentperday) {
          setTotalAmount(totalDays * data.rentperday);
        }
        console.log(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.log(error);
        setLoading(false);
      } 
    };
    fetchData();
    return () => {
    };
  }, [roomid,totalDays]);
  async function onToken(token) {
    console.log(token); 
    const bookingDetails = {
      room,
      user: JSON.parse(localStorage.getItem('currentUser')),
      fromdate,
      todate,
      totalDays,
      totalAmount,
      token
    };
    
    try {
      setLoading(true);
      const result = await axios.post('/api/bookings/bookroom', bookingDetails);
      console.log('User from LocalStorage:', localStorage.getItem('currentUser'));
      console.log('Booking Result:', result.data);
      setLoading(false);
      Swal.fire('Congrats' , 'Your Room has booked succeessfully' , 'success').then(result=>{
        window.location.href='/bookings'
      })
    } catch (error) {
      Swal.fire('Uhoh','Try again')
      setLoading(false);
    }
  }


  

  return (
    <div className='m-5'>
      {loading ? <Loader/> : error ? <Error/> : 
      <div className='row justify-content-center mt-5 bs'>
        <div className='col-md-6'>
            <h1>{room.name}</h1>
        <img src={room.imageurls[0]} className='bigimg' />
        </div>
        <div className='col-md-6' style={{textAlign:"right"}}>
            <div>
        <h1><b>Booking Details</b></h1>
                           <hr />
                           <p><b>Name</b> : </p>
                           <p><b>From Date</b> : {fromdate}</p>
                           <p><b>To Date</b> : {todate}</p>
                           <p><b>Max Count </b>: {room.maxcount}</p>
                           </div>      
        <div className='mt-5'>
                           <h1><b>Amount : </b></h1>
                           <hr />
                           <p>Total Days : {totalDays}<b></b></p>
                           <p>Rent Per Day : <b>{room.rentperday}</b></p>
                           <h1><b>Total Amount : {totalAmount} /-</b></h1>
                           <StripeCheckout currency='INR' amount={totalAmount*100}
                           token={onToken}
                           stripeKey="pk_test_51OVHBpSG1MEKAMKN4dNDBJ0HmFPfByVp85kRDCh52CUtvU7dVa0wsj3rDVkCs4r02PDfzqKaToYu1t04OsM9lx2X00s8HNrgXU">
                          <button className='btn btn-dark' >Pay Now</button>
                           </StripeCheckout>
                           
        </div>
        
      </div>
      
      </div>
      }
    </div>
  );
}

export default Bookingscreen;
