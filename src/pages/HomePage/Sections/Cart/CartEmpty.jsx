import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import image from '../../../../assets/EmptyCart.png';

function CartEmpty() {
    const [imageWidth, setImageWidth] = useState(window.innerWidth >= 768 ? 600 : 400);

    useEffect(() => {
        const handleResize = () => {
            setImageWidth(window.innerWidth >= 768 ? 600 : 400);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div style={{ margin: '100px 0px' }}>
            {/* Render an image of an empty cart */}
            <img
                src={image}
                alt="Empty Cart"
                style={{
                    width: `${imageWidth}px`,
                    height: 'auto',
                }}
            />
            <Typography variant="h2">Your Cart is Empty.</Typography>
            <Typography variant="h6">
                Add items to your cart from the Menu.
            </Typography>
        </div>
    );
}

export default CartEmpty;
