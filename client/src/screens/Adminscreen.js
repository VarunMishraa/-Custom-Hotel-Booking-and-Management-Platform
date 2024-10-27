import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Bookings',
    children: <Booking/>,
  },
  {
    key: '2',
    label: 'Rooms',
    children: <Rooms/>,
  },
  {
    key: '3',
    label: 'Add Rooms',
    children: <Addroom/>,
  },
   {
    key: '4',
    label: 'Users',
    children: <Users/>,
  },
];
function Adminscreen() {
    useEffect(() => {
      if(!JSON.parse(localStorage.getItem('currentUser')).isAdmin){
        window.location.href="/home"
      }
    
      return () => {
        
      }
    }, [])
    
  return (
    <div className='bs' style={{margin: '2rem 3rem 0rem 3rem' }}>
        <h2 className='text-center'><b>Admin panel </b></h2>
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export function Booking(){
    const [bookings, setbookings] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    useEffect( () => {
       const fetchdata = async () =>{
        try {
            setloading(true);
            const result = await axios.get("/api/bookings/getallbookings");
            setbookings(result.data);
            setloading(false);
        } catch (error) {
            setloading(false);
            seterror(true);
            console.log(error);
        }
       }
    fetchdata();
    return()=>{

    };

      }, []);

      return (
        <div className='row'>
        <div className='col-md-11'>
            <h1>Bookings</h1>
            {loading ? (<Loader/>) : error ? (<Error/>) : (<div>

                   <table className='table table-bordered table-dark'>
                       <thead className='bs'>
                           <tr>
                               <th>Booking Id</th>
                               <th>Userid</th>
                               <th>Room</th>
                               <th>From</th>
                               <th>To</th>
                               <th>Status</th>
                           </tr>
                       </thead>
                       <tbody>
                           {bookings.map(booking=>{
                               return <tr>
                                   <td>{booking._id}</td>
                                   <td>{booking.userid}</td>
                                   <td>{booking.room}</td>
                                   <td>{booking.fromdate}</td>
                                   <td>{booking.todate}</td>
                                   <td>{booking.status}</td>
                               </tr>
                           })}
                       </tbody>
                   </table>

            </div>)}
        </div>
        </div>
    )
}
export function Rooms() {
    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);

    useEffect( () => {
        const fetchdata = async () =>{
         try {
             setloading(true);
             const result = await axios.get("/api/rooms/getallrooms");
             setrooms(result.data);
             setloading(false);
         } catch (error) {
             setloading(false);
             seterror(true);
             console.log(error);
         }
        }
     fetchdata();
     return()=>{
 
     };
    },[]);
      return (
          <div className='col-md-11'>
              <h1>Rooms</h1>
              {loading ? (<Loader/>) : error ? (<Error/>) : (<div>
  
                     <table className='table table-bordered table-dark'>
                         <thead className='bs'>
                             <tr>
                                 <th>Room Id</th>
                                 <th>Name</th>
                                 <th>Type</th>
                                 <th>Rent Per day</th>
                                 <th>Max Count</th>
                                 <th>Phone Number</th>
                             </tr>
                         </thead>
                         <tbody>
                             {rooms.map(room=>{
                                 return <tr>
                                     <td>{room._id}</td>
                                     <td>{room.name}</td>
                                     <td>{room.type}</td>
                                     <td>{room.rentperday}</td>
                                     <td>{room.maxcount}</td>
                                     <td>{room.phonenumber}</td>
                                 </tr>
                             })}
                         </tbody>
                     </table>
  
              </div>)}
          </div>
      )
  }

  export function Users(){
    const[users , setusers] = useState()
  const[loading , setloading] = useState(false);
   useEffect(() => {
     const fetchData= async()=>{
        try {
            setloading(true);
            const result=await axios.get("api/users/getallusers");
            setusers(result.data);
            setloading(false);
        } catch (error) {
            setloading(false);
            console.log(error)
        }
     }
   
     fetchData();
     return () => {
       
     }
   }, [])
   return(
    <div className='row'>
          {loading && (<Loader/>)}

       <div className="col-md-10">
       <table className='table table-bordered table-dark'>
           <thead className='bs'>
             <tr>
               <th>Id</th>
               <th>Name</th>
               <th>Email</th>
               <th>isAdmin</th>
             </tr>
           </thead>
         
         <tbody>

        

          {users && (users.map(user=>{
            return <tr>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isAdmin ? 'YES' : 'NO'}</td>
            </tr>
          }))}
           </tbody>
          </table>
       </div>
    </div>
  )

   
  }


  
export function Addroom() {
    const [room, setroom] = useState("");
    const [rentperday, setrentperday] = useState();
    const [maxcount, setmaxcount] = useState();
    const [description, setdescription] = useState("");
    const [phonenumber, setphonenumber] = useState("");
    const [type, settype] = useState("");
    const [image1, setimage1] = useState("");
    const [image2, setimage2] = useState("");
    const [image3, setimage3] = useState("");
    async function addRoom()
    {
        const roomobj = {
            room ,  rentperday, maxcount ,description ,phonenumber ,type ,image1 ,image2 ,image3
        }
        try {
            const result = await axios.post('/api/rooms/addroom' , roomobj)
        } catch (error) {
            console.log(error);
        }
    }
   
    return (
      <div className="row">
       
          <div className="col-md-5">
            <input
              type="text"
              className="form-control mt-1"
              placeholder="name"
              value={room}
              onChange={(e) => {
                setroom(e.target.value);
              }}
            />
  
            <input
              type="text"
              className="form-control mt-1"
              placeholder="rentperday"
              value={rentperday}
              onChange={(e) => {
                setrentperday(e.target.value);
              }}
            />
  
            <input
              type="text"
              className="form-control mt-1"
              placeholder="maxcount"
              value={maxcount}
              onChange={(e) => {
                setmaxcount(e.target.value);
              }}
            />
  
            <input
              type="text"
              className="form-control mt-1"
              placeholder="description"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
  
            <input
              type="text"
              className="form-control mt-1"
              placeholder="phonenumber"
              value={phonenumber}
              onChange={(e) => {
                setphonenumber(e.target.value);
              }}
            />
            
          </div>
  
          <div className="col-md-6">
          <input
              type="text"
              className="form-control mt-1"
              placeholder="type"
              value={type}
              onChange={(e) => {
                settype(e.target.value);
              }}
            />
          <input
              type="text"
              className="form-control mt-1"
              placeholder="Image url 1"
              value={image1}
              onChange={(e) => {
                setimage1(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Image url 2"
              value={image2}
              onChange={(e) => {
                setimage2(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Image url 3"
              value={image3}
              onChange={(e) => {
                setimage3(e.target.value);
              }}
            />
            <div className='mt-3'>
            <button className="btn btn-dark" onClick={addRoom}>ADD ROOM</button>
            </div>
          </div>
       
      </div>
    );
  }

export default Adminscreen