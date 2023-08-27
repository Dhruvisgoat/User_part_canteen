import React from 'react';
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';
import { updateDoc, doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage, db } from '../../../../config/firebase';
import { useState,useEffect } from 'react';
import { toDate } from 'date-fns'; // Import the date-fns library or another date manipulation library






const OrdersSection = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersCollection = collection(db, 'Orders'); // Replace 'Orders' with your collection name
                const ordersSnapshot = await getDocs(ordersCollection);

                const ordersData = ordersSnapshot.docs.map(doc => doc.data());
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);


    return (
        <Container maxWidth="md" sx={{ marginTop: 10 }}>
            <Typography variant="h4" gutterBottom>
                Track Current Order
            </Typography>
            {/* <Card elevation={3}>
                <CardContent>
                    <List>
                        {orders.map(order => (
                            <div key={order.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Order ID: ${order.id}`}
                                        secondary={`Estimated Preparation Time: ${order.time}`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Contents:"
                                        secondary={order.items.map(item => `${item.name} ($${item.price.toFixed(2)}) ($${item.price.toFixed(2)})`).join(', ')}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Amount Paid:"
                                        secondary={`$${order.totalAmount}`}
                                    />
                                </ListItem>
                                <hr />
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card> */}

            <Divider></Divider>





            <Typography variant="h4" sx={{ margin: '30px' }}>
                Past Orders
            </Typography>

            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h6">Order History</Typography>
                    <List>
                        {orders.map(order => (
                            <div key={order.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Order ID: ${order.id}`}
                                        secondary={`Date: ${toDate(order.dateTime.seconds * 1000)}, Time: ${order.dateTime.toDate().toLocaleTimeString()}`}                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Contents:"
                                        secondary={order.items.map(item => `${item.name} ($${item.price.toFixed(2)})`).join(', ')}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Amount Paid:"
                                        secondary={`$${order.totalAmount}`}
                                    />
                                </ListItem>
                                <hr />
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>

        </Container>
    );
};

export default OrdersSection;
