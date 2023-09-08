import React from 'react';
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';
import { updateDoc, doc, deleteDoc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage, db ,auth } from '../../../../config/firebase';
import { useState, useEffect } from 'react';
import { toDate } from 'date-fns'; // Import the date-fns library or another date manipulation library
import { format } from 'date-fns'; // Import the date-fns library for date formatting


const OrdersSection = () => {
    const [orders, setOrders] = useState([]);

    function formatTimestamp(timestamp) {
        if (!timestamp || !timestamp.seconds) {
          return "N/A"; // Handle the case when the timestamp is not available
        }
        const date = new Date(timestamp.seconds * 1000); // Convert to milliseconds
        return format(date, 'MM/dd/yyyy HH:mm:ss'); // Adjust the format as needed
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const ordersCollection = collection(db, `/Users/${auth.currentUser.email}/orders`); // Replace 'Orders' with your collection name
                // const ordersCollection = collection(db, `Orders`); // Replace 'Orders' with your collection name
                const ordersSnapshot = await getDocs(ordersCollection);
                const ordersData = ordersSnapshot.docs.map(doc => doc.data());
                setOrders(ordersData);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const today = format(new Date(), 'MM/dd/yyyy');

    // Filter orders to include only those with today's date
    const todayOrders = orders.filter(order => {
        const orderDate = formatTimestamp(order.orderDate).split(' ')[0]; // Extract the date part
        return orderDate === today;
    });    

    return (
        <Container maxWidth="md" sx={{ marginTop: 5 }}>
            <Typography variant="h4" gutterBottom>
                Today's Order/s
            </Typography>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h6">Order History</Typography>
                    <List>
                        {todayOrders.map(order => (
                            <div key={order.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={`Order ID: ${order.orderId}`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Contents:"
                                        secondary={order.Cart.map(item => `${item.Name} (Rs.${item.Price}*${item.count})`).join(' , ')}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Order Date & Time:"
                                        secondary={formatTimestamp(order.orderDate)}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Total Amount Paid:"
                                        secondary={`Rs.${order.TotalPrice}`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Order Status"
                                        secondary='Pending'
                                    />
                                </ListItem>
                                <hr />
                            </div>
                        ))}
                    </List>
                </CardContent>
            </Card>

            <Divider></Divider>

            <Typography variant="h4" sx={{ marginTop: 5 }}>
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
                                        primary={`Order ID: ${order.orderId}`}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Contents:"
                                        secondary={order.Cart.map(item => `${item.Name} (Rs.${item.Price}*${item.count})`).join(' , ')}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Order Date & Time:"
                                        secondary={formatTimestamp(order.orderDate)}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Total Amount Paid:"
                                        secondary={`Rs.${order.TotalPrice}`}
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
