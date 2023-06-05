import { useContext } from 'react';
import avatarImg from '../../../assets/images/placeholder.jpg'
import { AuthContext } from '../../../providers/AuthProvider';
const Avatar = () => {
    const { user } = useContext(AuthContext)
    return (
        <img
            // This code provides a fallback in case the browser does not support the referrerPolicy attribute on the iframe element. It is used to set the referrer policy on the iframe element.
            referrerPolicy='no-referrer'
            className='rounded-full'
            src={user && user.photoURL ? user.photoURL : avatarImg}
            alt="profile" height='30' width='30' />
    );
};

export default Avatar;