import React, { useEffect, useState } from 'react';
import { Tabs, Tag } from 'antd';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Swal from 'sweetalert2';
const user=JSON.parse(localStorage.getItem("currentUser"));
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: '1',
    label: 'Profile',
    children: (
      <div className="row">
        <div className="col-md-6 bs m-2 p-3">
          <h1>Name : {user && user.name}</h1>
          <h1>Email : {user && user.email}</h1>
          <h1>Admin Access : {user && user.isAdmin ? 'Yes' : 'No'}</h1>
          <div className='d-flex justify-content-end'>
            <button className='btn btn-dark'>Get Admin Access</button>
          </div>
        </div>
      </div>
    ),
  },
  {
    key: '2',
    label: 'Bookings',
    children: <Booking />,
  },
];

export default function Profilescreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div className='bs'>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
}

export function Booking() {
  const [mybookings, setmybookings] = useState([]);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(false);
  const user = JSON.parse(localStorage.getItem('currentUser'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        console.log(user?._id);
        const result = await axios.post('api/bookings/getuserbookings', { userid: user?._id });
        setmybookings(result.data); // Assuming the actual data is in the `data` property
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };

    fetchData();

    return () => {
      // Cleanup logic (if needed)
    };
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setloading(true);
      const cancel = await axios.post('/api/bookings/cancelmyroom', { bookingid: bookingid, roomid: roomid });
      setloading(false);
      Swal.fire('Congrats', 'Your Room has cancelled successfully', 'success').then((result) => {
        window.location.href = '/profile';
      });
    } catch (error) {
      setloading(false);
      Swal.fire('Oops', 'Something went wrong', 'error').then((result) => {
        window.location.href = '/profile';
      });
    }
  }

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        mybookings.map((booking) => {
          return (
            <div className='row'>
              <div className='col-md-6 my-auto'>
                <div className='bs m-1 p-2'>
                  <h1>{booking.room}</h1>
                  <p>BookingId : {booking._id}</p>
                  <p>TransactionId : {booking.transactionId}</p>
                  <p>
                    <b>Check In : </b>
                    {booking.fromdate}
                  </p>
                  <p>
                    <b>Check Out : </b>
                    {booking.todate}
                  </p>
                  <p>
                    <b>Amount : </b> {booking.totalAmount}
                  </p>
                  <p>
                    <b>Status</b> : {booking.status === 'booked' ? <Tag color='green'>Confirmed</Tag> : <Tag color='red'>Cancelled</Tag>}
                  </p>
                  <div className='d-flex justify-content-end'>
                    {booking.status === 'booked' && (
                      <button className='btn btn-dark' onClick={() => cancelBooking(booking._id, booking.roomid)}>
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
