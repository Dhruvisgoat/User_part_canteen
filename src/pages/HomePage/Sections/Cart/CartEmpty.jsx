import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import image from '../../../../assets/EmptyCart.png';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function CartEmpty() {
    const [imageWidth, setImageWidth] = useState(window.innerWidth >= 768 ? 600 : 400);
    
    const navigate = useNavigate();
    const navigateToMenu = () => {
        navigate('/home/menu');
    };

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
            <Typography variant="h6" sx={{ mt: 3 }}>
                Add items to your cart from the Menu.
            </Typography>
            <Button
                sx ={{ mt: 3 }}
                onClick ={navigateToMenu}
            >
                Back to Menu
            </Button>
        </div>
    );
}

export default CartEmpty;
