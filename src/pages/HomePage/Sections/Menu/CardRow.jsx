import React, { useEffect, useState } from 'react';
import { updateDoc, doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage, db } from '../../../../config/firebase';
import { useCart } from '../../../../Context/CartContext';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Skeleton } from '@mui/material';
const placeholderImageUrl = 'https://via.placeholder.com/150';

function CardRow({ title }) {
  const [imageUrls, setImageUrls] = useState({});
  const [foodList, setFoodList] = useState([]);
  const { cart, handleAddToCart, handleSubtractToCart } = useCart();
  const [foodCounts, setFoodCounts] = useState({});
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const getFoodList = async () => {
    try {
      // Fetch Specials category data
      const foodRef = collection(db, `/Menu/${title}/items`);
      const snapshot = await getDocs(foodRef);
      const foodData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFoodList(foodData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchImageUrls = async () => {
    const urls = {};

    for (const food of foodList) {
      if (food.imageUrl) {
        try {
          const storageRef = ref(storage, `FoodCategory/${title}/${food.imageUrl}`);
          const imageUrl = await getDownloadURL(storageRef);
          urls[food.id] = imageUrl;
        } catch (error) {
          // Handle errors while fetching the image URL
          console.error(`Error fetching image URL for food ${food.Name}:`, error);
          // You can set a default fallback image URL in case of an error
          urls[food.id] = placeholderImageUrl;
        }
      }
    }
    setImageUrls(urls);
  };

  useEffect(() => {
    async function fetchData() {
      await getFoodList();
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (foodList.length > 0) {
      fetchImageUrls();
    }
  }, [foodList]);

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

  return (
    <div>
      <hr />
      <Typography variant="h4" className='m-3 p-2' sx={{ textAlign: 'center' }}>{title}</Typography>
      <div className='CardRow' style={{ display: 'flex', overflowX: "auto", minWidth: '100%' }}>

        {isLoading ? ( 
          <>
            <Skeleton variant="rectangular" width={600} height={394} sx={{ borderRadius: "20px", margin: '0 10px' }} />
            <Skeleton variant="rectangular" width={600} height={394} sx={{ borderRadius: "20px", margin: '0 10px' }} />
            <Skeleton variant="rectangular" width={600} height={394} sx={{ borderRadius: "20px", margin: '0 10px' }} />
            <Skeleton variant="rectangular" width={600} height={394} sx={{ borderRadius: "20px", margin: '0 10px' }} />
          </>
        ) : (
          foodList.map((food) => (
            <Card key={food.id} sx={{ padding: '10px', flex: '0 0 auto', width: '15rem', margin: '0 10px' }} className='Card'>
              <CardMedia
                component="img"
                height="200"
                image={imageUrls[food.id] ? imageUrls[food.id] : placeholderImageUrl}
                alt="no image"
                sx={{ borderRadius: "20px" }}
              />
              <CardContent sx={{ textAlign: 'center' }}>
                <div>
                  <Typography variant="h6">{food.Name}</Typography>
                  <Typography >{`One for ₹ ${food.Price}.00`}</Typography>
                </div>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button
                    size='small'
                    sx={{ border: '1px solid black', backgroundColor: '#6282BC' }}
                    variant='contained'
                    className='m-1'
                    onClick={() => {
                      handleAddToCart(food);
                      increaseCount(food.id);
                    }}>
                    +
                  </Button>
                  <Button
                    size='small'
                    sx={{ border: '1px solid black' }}
                    className='m-1'>
                    {foodCounts[food.id] || 0}
                  </Button>
                  <Button
                    size='small'
                    sx={{ border: '1px solid black', backgroundColor: '#6282BC' }}
                    className='m-1'
                    variant='contained'
                    onClick={() => {
                      handleSubtractToCart(food.id);
                      decreaseCount(food.id);
                    }}>
                    -
                  </Button>
                </CardActions>
              </CardContent>

            </Card>
          )))}

      </div>
    </div>
  );
}

export default CardRow;
