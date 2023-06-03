import React from 'react';
import Heading from '../Heading/Heading';

const Header = () => {
    return (
        <>
         <Heading
                title='Tiltel bali'
                subtitle='Chitta bali, adasj'
            ></Heading>   
            <div className='w-full md:h-[60vh] overflow-hidden rounded-xl'>
                <img className='object-cover w-full' src="https://images.unsplash.com/photo-1642362932918-e06b87fc185b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" alt="" />
                
                
            </div>
        </>
    );
};

export default Header;