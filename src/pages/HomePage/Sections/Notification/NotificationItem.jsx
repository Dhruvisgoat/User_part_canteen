import React from 'react';
import { ListItem, ListItemText, Divider } from '@mui/material';

const NotificationItem = ({ title, content }) => {
    return (
        <div>
            <ListItem alignItems="flex-start">
                <ListItemText primary={title} secondary={content} />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    );
};

export default NotificationItem;
