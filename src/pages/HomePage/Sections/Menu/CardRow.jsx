import React, { useEffect, useState } from 'react';
import { updateDoc, doc, deleteDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage, db, auth } from '../../../../config/firebase';
import { useCart } from '../../../../Context/CartContext';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Skeleton } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const placeholderImageUrl = 'https://via.placeholder.com/150';

function CardRow({ title, sortOption, searchQuery }) {
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

  useEffect(() => {
    // Sort the foodList based on the selected sortOption
    if (sortOption === 'name') {
      // Sort by food name
      setFoodList([...foodList].sort((a, b) => a.Name.localeCompare(b.Name)));
    } else if (sortOption === 'price') {
      // Sort by food price
      setFoodList([...foodList].sort((a, b) => a.Price - b.Price));
    }
  }, [sortOption]);


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

  const filterFoodItems = (foodList, query) => {
    return foodList.filter((food) =>
      food.Name.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredFoodList = filterFoodItems(foodList, searchQuery);


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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDishAdded, setIsDishAdded] = useState(false);



  const addFavourite = async (food) => {
    try {
      const favoritesRef = collection(db, `/Users/${auth.currentUser.email}/favourites`);
      const querySnapshot = await getDocs(favoritesRef);

      // Check if the dish is already in favorites
      let isAlreadyAdded = false;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.food.id === food.id) {
          isAlreadyAdded = true;
        }
      });

      if (isAlreadyAdded) {
        // Dish is already in favorites
        setIsDishAdded(false);
      } else {
        // Add the dish to favorites
        await addDoc(favoritesRef, {
          food,
          Title: title,
        });
        setIsDishAdded(true);
      }

      // Open the dialog to show the result
      setIsDialogOpen(true);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  function capitalizeTitle(title) {
    // Split the title into words
    const words = title.split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    );

    // Join the capitalized words back into a string
    const capitalizedTitle = capitalizedWords.join(' ');

    return capitalizedTitle;
  }
  const hasItems = filteredFoodList.length > 0;

  return (
    <div>
      {hasItems && (
        <>
          <hr />
          <Typography variant="h4" className='m-3 p-2' sx={{ textAlign: 'center', fontFamily: 'monospace', textTransform: 'uppercase' }}>
            {title}
          </Typography>
          <div className='CardRow' style={{ overflowX: "auto", minWidth: '100%' }}>
            <div className='CardRow' style={{ display: 'flex', overflowX: 'auto', minWidth: '100%' }}>
              {isLoading ? (
                <>
                  <Skeleton variant="rectangular" width={600} height={394} sx={{ borderRadius: "20px", margin: '0 10px' }} />
                  <Skeleton variant="rectangular" width={600} height={394} sx={{ borderRadius: "20px", margin: '0 10px' }} />
                  <Skeleton variant="rectangular" width={600} height={394} sx={{ borderRadius: "20px", margin: '0 10px' }} />
                  <Skeleton variant="rectangular" width={600} height={394} sx={{ borderRadius: "20px", margin: '0 10px' }} />
                </>
              ) : (
                filteredFoodList.map((food) => (
                  <Card key={food.id} sx={{ padding: '10px', flex: '0 0 auto', width: '20rem', margin: '0 10px', borderRadius: '30px' }} className='Card'>
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
                          sx={{ border: '1px solid black', backgroundColor: '#257090' }}
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
                          sx={{ border: '1px solid black', backgroundColor: '#257090' }}
                          className='m-1'
                          variant='contained'
                          onClick={() => {
                            handleSubtractToCart(food.id);
                            decreaseCount(food.id);
                          }}>
                          -
                        </Button>

                      </CardActions>
                      <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                        Add/Remove from Cart
                      </Typography>
                      <Button onClick={() => addFavourite(food)} sx={{ border: '1px solid grey', marginTop: '5px', borderRadius: '10px' }}>
                        ❤️ Add to favourites
                      </Button>
                    </CardContent>
                  </Card>
                )))}
            </div>
        </div>
        </>
      )}

      <Dialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{isDishAdded ? 'Success ✅' : 'Already Added'}</DialogTitle>
        <DialogContent>
          {isDishAdded
            ? 'The dish has been successfully added to your favorites.'
            : 'This dish is already in your favorites.'}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CardRow;
