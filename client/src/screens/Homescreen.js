import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Room from '../components/Room';
import Error from "../components/Error";
import Loader from "../components/Loader";
import Success from '../components/Success';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;

function Homescreen() {
    const [rooms,setRooms]=useState([]);
    const [loading,setLoading]=useState();
    const [error,setError]=useState();
    const [fromdate, setfromdate] = useState('');
    const [todate, settodate] = useState('')
    const [initialRooms, setInitialRooms] = useState([]);
    const [searchkey, setsearchkey] = useState('');
    const[type , setType]=useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = (await axios.get('/api/rooms/getallrooms')).data;
        setRooms(data);
        setInitialRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData(); 
    return () => {
      
    };
  }, []); 

  function filterByDate(dates) {
    console.log('Selected Dates:', dates);
  
    if (!dates || dates.length < 2) {
      console.error('Invalid dates:', dates);
      setRooms(initialRooms); // Reset to initial state when no dates are selected
      return;
    }
  
    const [momentFromDate, momentToDate] = dates;
  
    // Use constant names that don't conflict with the hook state variables
    const fromDateValue = momentFromDate.toDate();
    const toDateValue = momentToDate.toDate();
  
    const formattedFromDate = moment(fromDateValue).format('DD-MM-YYYY');
    const formattedToDate = moment(toDateValue).format('DD-MM-YYYY');
  
    console.log('Formatted From Date:', formattedFromDate);
    console.log('Formatted To Date:', formattedToDate);
    setfromdate(formattedFromDate);
    settodate(formattedToDate);
    var temp = [];
  
    for (const room of rooms) {
      var availability = true; // Assume room is available
  
      for (const booking of room.currentbookings) {
        if (
          moment(formattedFromDate).isBetween(booking.fromdate, booking.todate) ||
          moment(formattedToDate).isBetween(booking.fromdate, booking.todate) ||
          moment(formattedFromDate).isSame(booking.fromdate) ||
          moment(formattedFromDate).isSame(booking.todate) ||
          moment(formattedToDate).isSame(booking.fromdate) ||
          moment(formattedToDate).isSame(booking.todate)
        ) {
          availability = false;
          break;
        }
      }
  
      if (room.currentbookings.length === 0 || availability) {
        temp.push(room);
      }
    }
  
    setRooms(temp.length > 0 ? temp : initialRooms);
  }
  
  
  function filterBySearch()
  {
    const dupdate = initialRooms.filter(room=>room.name.toLowerCase().includes(searchkey))
    setRooms(dupdate)
  }

 
function filterByType(e) {
  const selectedType = e.target.value; // Use the updated value directly

  setType(selectedType);

  if (selectedType !== 'all') {
    const filteredRooms = initialRooms.filter(room => room.type.toLowerCase() === selectedType.toLowerCase());
    setRooms(filteredRooms);
  } else {
    setRooms(initialRooms);
  }
}

  

  return (
  <div className='container'>

<div className='row bs'>
  <div className='col-md-3 '>
    <RangePicker format={'DD-MM-YYYY'} onChange={filterByDate} />
  </div>

  <div className="col-md-4">
    <input
      type="text"
      className="form-control m-2 search "
      placeholder='Search Rooms'
      value={searchkey}
      onKeyUp={filterBySearch}
      onChange={(e) => { setsearchkey(e.target.value) }}
    />
  </div>

  <div className="col-md-4">
    <select className="form-control m-2 type" value={type} onChange={filterByType} >
      <option value="all">All</option>
      <option value="delux">Delux</option>
      <option value="non-delux">Non Delux</option>
    </select>
  </div>
</div>

    <div className='row justify-content-center mt-5'>
    {loading ? <Loader/> : error ? <Error/> : rooms.map(room=>{
    return  <div className='col-md-9 mt-2 '>
          <Room room={room} fromdate={fromdate} todate={todate}/>
    </div>
    })}
    </div>
  </div>
  )
}

export default Homescreen;
