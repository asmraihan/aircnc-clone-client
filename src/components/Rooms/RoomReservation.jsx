import React, { useContext, useState } from 'react';
import Calender from '../Rooms/Calender'
import Button from '../Button/Button';
import { AuthContext } from '../../providers/AuthProvider';
import BookingModal from '../Modal/BookingModal';
import { formatDistance } from 'date-fns'
import { addBooking } from '../../api/bookings';

const RoomReservation = ({ roomData }) => {
    const { user, role } = useContext(AuthContext)
    const totalPrice = parseFloat(formatDistance(new Date(roomData.to), new Date(roomData.from)).split(' ')[0]) * roomData.price
    console.log(totalPrice)
    const [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }
    const [value, setValue] = useState({
        startDate: new Date((roomData?.from)),
        endDate: new Date((roomData?.to)),
        key: 'selection'
    });

    // Booking state
    const [bookingInfo, setBookingInfo] = useState({
        guest: {
            name: user.displayName,
            email: user.email,
            image: user.photoURL
        },
        host: roomData.host.email,
        location: roomData.location,
        price: totalPrice,
        to: value.endDate,
        from: value.startDate,
        title: roomData.title,
    })
    const handleSelect = (ranges) => {
        setValue({ ...value })
    }
    const modalHandler = () => {
        addBooking(bookingInfo).then(data => {
            console.log(data)
            closeModal()
            toast.success('Booking successful')

        }).catch(err => {
            console.log(err)
            closeModal()
            toast.error('Booking failed')
        })
        console.log(bookingInfo)
    }
    return (
        <div className='bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden'>
            <div className='flex flex-row items-center gap-1 p-4'>
                <div className='text-2xl font-semibold'>
                    ${roomData.price}
                </div>
                <div className='font-light text-neutral-600'>
                    night
                </div>
            </div>
            <hr></hr>
            <div className='flex justify-center'>
                <Calender handleSelect={handleSelect} value={value}></Calender>
            </div>
            <hr />
            <div className='p-4'>
                <Button onClick={() => { setIsOpen(true) }} disabled={roomData.host.email === user.email} label='Reserve'></Button>
            </div>
            <hr />
            <div className='p-4 flex flex-row items-center justify-between font-semibold text-lg'>
                <div>Total</div>
                <div>${totalPrice}</div>
            </div>
            <BookingModal bookingInfo={bookingInfo} modalHandler={modalHandler} closeModal={closeModal} isOpen={isOpen} ></BookingModal>
        </div>
    );
};

export default RoomReservation;