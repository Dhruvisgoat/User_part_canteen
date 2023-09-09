import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../../../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { Card, CardContent, CardMedia, Button, Typography, Grid, CardActions} from '@mui/material';
import { doc, deleteDoc } from 'firebase/firestore';
import { useCart } from '../../../../Context/CartContext';

function Favourites() {
    const { cart, handleAddToCart, handleSubtractToCart } = useCart();
    const [foodCounts, setFoodCounts] = useState({});
    const [foodList, setFoodList] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add a loading state
    const [imageUrls, setImageUrls] = useState({});
    const placeholderImageUrl = 'https://via.placeholder.com/150';

    const getFoodlist = async () => {
        try {
            // Fetch Specials category data
            const foodRef = collection(db, `/Users/${auth.currentUser.email}/favourites`);
            const snapshot = await getDocs(foodRef);
            const foodData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setFoodList(foodData);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const getimageUrl = async () => {
        const urls = {};
        for (const food of foodList) {
            if (food.food.imageUrl) {
                try {
                    const storageRef = ref(storage, `FoodCategory/${food.Title}/${food.food.imageUrl}`);
                    const imageUrl = await getDownloadURL(storageRef);
                    urls[food.id] = imageUrl;
                } catch (error) {
                    // Handle errors while fetching the image URL
                    console.error(`Error fetching image URL for food ${food.food.Name}:`, error);
                    // You can set a default fallback image URL in case of an error
                    urls[food.id] = placeholderImageUrl;
                }
            }
        }
        setImageUrls(urls);
    };

    useEffect(() => {
        getFoodlist();
    }, []);

    // Call getimageUrl after foodList has been set
    useEffect(() => {
        if (!isLoading) {
            getimageUrl();
        }
    }, [isLoading]);

    const increaseCount = (foodId) => {
        setFoodCounts((prevCounts) => ({
            ...prevCounts,
            [foodId]: (prevCounts[foodId] || 0) + 1,
        }));
    };

    const decreaseCount = (foodId) => {
        if (foodCounts[foodId] > 0) {
            setFoodCounts((prevCounts) => ({
                ...prevCounts,
                [foodId]: prevCounts[foodId] - 1,
            }));
        }
    };


    const removeFavourite = async (id) => {
        try {
            const favorite_id = doc(db, `/Users/${auth.currentUser.email}/favourites/${id}`)
            await deleteDoc(favorite_id)
            const newFoodList = foodList.filter((item) => item.id !== id);
            setFoodList(newFoodList);
        }
        catch (error) {
            console.log(error)
        }
    };

    return (
        <div style={{ padding: '30px' }}>
            <h1 style={{ textAlign: 'center', margin: '30px' }} >Favourites</h1>
            {foodList.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '30px' }}>No favorites added yet.</div>
            ) : (
                <Grid container spacing={2}>
                    {foodList.map((item) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                            <Card sx={{ padding: '30px', borderRadius:'30px'}}>
                                <CardMedia
                                    component="img"
                                    alt={item.food.Name}
                                    height="200"
                                    image={imageUrls[item.id] || placeholderImageUrl}
                                    sx={{ borderRadius: '10px' }}
                                />
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                                        {item.food.Name}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                                        One for Rs.{item.food.Price}
                                    </Typography>

                                    <CardActions sx={{ justifyContent: 'center' }}>
                                        <Button
                                            size='small'
                                            sx={{ border: '1px solid black', backgroundColor: '#257090' }}
                                            variant='contained'
                                            className='m-1'
                                            onClick={() => {
                                                handleAddToCart(item.food);
                                                increaseCount(item.food.id);
                                            }}>
                                            +
                                        </Button>
                                        <Button
                                            size='small'
                                            sx={{ border: '1px solid black' }}
                                            className='m-1'>
                                            {foodCounts[item.food.id] || 0}
                                        </Button>
                                        <Button
                                            size='small'
                                            sx={{ border: '1px solid black', backgroundColor: '#257090' }}
                                            className='m-1'
                                            variant='contained'
                                            onClick={() => {
                                                handleSubtractToCart(item.food.id);
                                                decreaseCount(item.food.id);
                                            }}>
                                            -
                                        </Button>

                                    </CardActions>
                                    <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                                        Add/Remove from Cart
                                    </Typography>
                                    <div style={{ textAlign: 'center',marginTop:'5px' }}>
                                        <Button
                                            onClick={() => removeFavourite(item.id)}
                                            sx={{ border: '1px solid grey',borderRadius:'10px' }}
                                        >
                                            💔 Remove From Favourites
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
}
export default Favourites;
