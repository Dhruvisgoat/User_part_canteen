import React from 'react';
import { Container, Typography, Card, CardContent, List } from '@mui/material';
import NotificationItem from './NotificationItem'; // Adjust the import path

const NotificationsSection = () => {
    const notifications = [
        {
            id: 1,
            title: 'Special Offer!',
            content: 'Get 20% off on all meals this weekend. Use code WEEKEND20.',
        },
        {
            id: 2,
            title: 'New Menu Items',
            content: 'Introducing delicious and healthy salads to our menu.',
        },
        // Add more notifications as needed
    ];

    return (
        <Container maxWidth="md" sx={{ marginTop: 10 }}>
            <Typography variant="h4" gutterBottom>
                Notifications
            </Typography>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h6">Recent Notifications</Typography>
                    <List>
                        {notifications.map(notification => (
                            <NotificationItem
                                key={notification.id}
                                title={notification.title}
                                content={notification.content}
                            />
                        ))}
                    </List>
                </CardContent>
            </Card>
        </Container>
    );
};

export default NotificationsSection;
