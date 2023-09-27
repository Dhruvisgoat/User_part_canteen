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
    async function fetchData() {
      await getFoodList();
    }
    fetchData();
  }, []);

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

  const displayAddedCArt = (food) => {
    // show a prompt to the user
    alert(`${food.Name} added to cart`);
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
  const [isImageLoaded, setImageLoaded] = useState(false);

  return (
    <div>

      <>
        {hasItems && (
          <>
            <hr />
            <h4 className='m-3 p-2' style={{ textAlign: 'center' }} sx={{ textAlign: 'center', fontFamily: 'monospace', textTransform: 'uppercase' }}>
              {title}
            </h4>

          </>

        )}


        <div className='CardRow' style={{ overflowX: "auto", minWidth: '100%' }}>
          <div className='CardRow' style={{ display: 'flex', overflowX: 'auto', minWidth: '100%' }}>

            {isLoading ? (
              <div style={{ margin: '100px 10px 0px 10px', display: 'flex' }}>
                <Skeleton variant="rectangular" width={330} height={250} sx={{ borderRadius: "20px", margin: '0 10px' }} />
                <Skeleton variant="rectangular" width={330} height={250} sx={{ borderRadius: "20px", margin: '0 10px' }} />
                <Skeleton variant="rectangular" width={330} height={250} sx={{ borderRadius: "20px", margin: '0 10px' }} />
                <Skeleton variant="rectangular" width={330} height={250} sx={{ borderRadius: "20px", margin: '0 10px' }} />
              </div>
            ) :
              (
                filteredFoodList.map((food) =>
                (
                  <Card key={food.id} sx={{ flex: '0 0 auto', width: '15rem', margin: '0 10px', borderRadius: '30px' }} className='Card'>
                    <CardMedia
                      component="img"
                      height="150"
                      src={imageUrls[food.id] }
                      alt="no image"
                      sx={{ borderRadius: "20px" }}
                      style={{ display: isImageLoaded ? 'block' : 'none' }}
                      onLoad={() => setImageLoaded(true)}
                    />
                    {isImageLoaded ? null : (
                      <Skeleton variant="rectangular" height='150px' sx={{ borderRadius: "20px" }} />
                    )}

                    <CardContent sx={{ textAlign: 'center' }}>
                      <div>
                        <div >{`${food.Name}: ₹ ${food.Price}.00`} </div>
                      </div>
                      <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <Button
                          size='small'
                          sx={{ border: '1px solid black', backgroundColor: '#257090' }}
                          variant='contained'
                          className='m-1'
                          onClick={() => {
                            handleAddToCart(food);
                            increaseCount(food.id);
                            displayAddedCArt(food);
                          }}>
                          Add to Cart
                        </Button>
                        {/* add to favourite  */}
                        <Button
                          size='small'
                          sx={{ border: '1px solid black', backgroundColor: '#257090' }}
                          variant='outlined'
                          className='m-1'
                          onClick={() => addFavourite(food)}>
                          ❤️
                        </Button>

                      </div>

                    </CardContent>
                  </Card>
                ))
              )
            }
          </div>
        </div>
      </>


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
