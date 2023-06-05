import React, { useContext, useState } from 'react';
import AddRoomForm from '../../components/Forms/AddRoomForm';
import { set } from 'date-fns';
import { imageUpload } from '../../api/utils';
import { AuthContext } from '../../providers/AuthProvider';
import { addRoom } from '../../api/rooms';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddRoom = () => {
    const {user} = useContext(AuthContext)
    const [dates, setDates] = useState({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')
    // handle form submit
    const handleSubmit = (event) => {
        setLoading(true)
        event.preventDefault();
        const location = event.target.location.value
        const title = event.target.title.value
        const from = dates.startDate
        const to = dates.endDate
        const price = event.target.price.value
        const guests = event.target.total_guest.value
        const bedrooms = event.target.bedrooms.value
        const bathrooms = event.target.bathrooms.value
        const description = event.target.description.value
        const category = event.target.category.value
        const image = event.target.image.files[0]
        setUploadButtonText('Uploading...')
        // image upload
        imageUpload(image).then(data => {
            const roomData = {
                location,
                title,
                from,
                to,
                price: parseFloat(price),
                guests,
                bedrooms,
                bathrooms,
                description,
                image: data.data.display_url,
                host: {
                  name: user?.displayName,
                  image: user?.photoURL,
                  email: user?.email,
                },
                category,
              }
              //   post roomData to server
              addRoom(roomData).then(data=> {
                console.log(data)
                setUploadButtonText('Uploaded!')
                setLoading(false)
                toast.success('Room added successfully')
                navigate('/dashboard/my-listings')
              }).catch(err=>console.log(err.message))
            setLoading(false)
        
        }).catch(err => {
            console.log(err.message)
            setLoading(false)
        })
        console.log(location)
    }
    const handleImageChange = (image) => {
        setUploadButtonText(image.name)
    }

    const handleDates =(ranges)=>{
        setDates(ranges.selection)
    }
    return (
        <AddRoomForm
            handleSubmit={handleSubmit} loading={loading} handleImageChange={handleImageChange} uploadButtonText={uploadButtonText} dates={dates} handleDates={handleDates}
        ></AddRoomForm>
    );
};

export default AddRoom;