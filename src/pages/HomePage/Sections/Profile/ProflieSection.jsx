import React, { useState } from 'react';
import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import { db, auth } from '../../../../config/firebase';
import { addDoc,updateDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { doc } from 'firebase/firestore';

const ProfileSection = () => {
    const [editOpen, setEditOpen] = useState(false);
    const [editedValue, setEditedValue] = useState('');
    const [sectionName, setSectionName] = useState('');
    const [fieldData, setFieldData] = useState({
        Name: 'john doe',
        Email: 'john@example.com',
        Street: '123 Main St',
        City: 'New York',
        State: 'NY',
        ZipCode: '10001',
    });

    const handleEditOpen = (name, value) => {
        setSectionName(name);
        setEditedValue(value);
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    // const handleEditSave = () => {
    //     // Update the field's value in the fieldData object
    //     setFieldData((prevData) => ({
    //         ...prevData,
    //         [sectionName]: editedValue,
    //     }));

    //     // Close the edit dialog
    //     setEditOpen(false);
    // };

    const handleEditSave = async () => {

        try {
            // Update the field's value in the fieldData object
            setFieldData((prevData) => ({
                [sectionName]: editedValue,
            }));
            // Update the field's value in the database
            const userRef = doc(db, 'Users', auth.currentUser.email );
            await updateDoc(userRef, {
                [sectionName]: editedValue
            });

            // Close the edit dialog
            setEditOpen(false);
        }
        catch (error) {
            console.log(error);
        }
    };


    return (
        <Container maxWidth="md" sx={{ marginTop: 5 }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }} gutterBottom>
                Profile
            </Typography>
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h6">Personal Information</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Name" secondary={fieldData.Name} />
                            <Button onClick={() => handleEditOpen('Name', fieldData.Name)}>Edit</Button>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Email" secondary={fieldData.Email} />
                            <Button onClick={() => handleEditOpen('Email', fieldData.Email)}>Edit</Button>
                        </ListItem>
                    </List>
                </CardContent>
            </Card>
            <Divider />
            <Card elevation={3}>
                <CardContent>
                    <Typography variant="h6">Address</Typography>
                    <List>
                        <ListItem>
                            <ListItemText primary="Street" secondary={fieldData.Street} />
                            <Button onClick={() => handleEditOpen('Street', fieldData.Street)}>Edit</Button>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="City" secondary={fieldData.City} />
                            <Button onClick={() => handleEditOpen('City', fieldData.City)}>Edit</Button>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="State" secondary={fieldData.State} />
                            <Button onClick={() => handleEditOpen('State', fieldData.State)}>Edit</Button>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Zip Code" secondary={fieldData.ZipCode} />
                            <Button onClick={() => handleEditOpen('ZipCode', fieldData.ZipCode)}>Edit</Button>
                        </ListItem>
                    </List>

                </CardContent>
            </Card>
            <Dialog open={editOpen} onClose={handleEditClose}>
                <DialogTitle>Edit {sectionName}</DialogTitle>
                <DialogContent>
                    <TextField
                        fullWidth
                        label={`Edit ${sectionName}`}
                        value={editedValue}
                        onChange={(e) => setEditedValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditClose}>Cancel</Button>
                    <Button onClick={handleEditSave} variant="contained" color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ProfileSection;
