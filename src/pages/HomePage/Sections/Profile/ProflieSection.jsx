// import React, { useState } from 'react';
// import { Container, Typography, Card, CardContent, List, ListItem, ListItemText, Divider, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
// import { db, auth } from '../../../../config/firebase';
// import { addDoc,updateDoc } from 'firebase/firestore';
// import { collection } from 'firebase/firestore';
// import { doc } from 'firebase/firestore';

// const ProfileSection = () => {
//     const [editOpen, setEditOpen] = useState(false);
//     const [editedValue, setEditedValue] = useState('');
//     const [sectionName, setSectionName] = useState('');

//     const [fieldData, setFieldData] = useState({
//         Name: 'john doe',
//         Email: 'john@example.com',
//         Contact:'1234567890',
//         Street: '123 Main St',
//         City: 'New York',
//         State: 'NY',
//         ZipCode: '10001'
//     });

//     const handleEditOpen = (name, value) => {
//         setSectionName(name);
//         setEditedValue(value);
//         setEditOpen(true);
//     };

//     const handleEditClose = () => {
//         setEditOpen(false);
//     };

//     const handleEditSave = async () => {

//         try {
//             // Update the field's value in the fieldData object
//             setFieldData((prevData) => ({
//                 [sectionName]: editedValue,
//             }));
//             // Update the field's value in the database
//             const userRef = doc(db, 'Users', auth.currentUser.email );
//             await updateDoc(userRef, {
//                 [sectionName]: editedValue
//             });
//             // Close the edit dialog
//             setEditOpen(false);
//         }
//         catch (error) {
//             console.log(error);
//         }
//     };


//     return (
//         <Container maxWidth="md" sx={{ marginTop: 5 }}>
//             <Typography variant="h4" sx={{ textAlign: 'center' }} gutterBottom>
//                 Profile
//             </Typography>
//             <Card elevation={3}>
//                 <CardContent>
//                     <Typography variant="h6">Personal Information</Typography>
//                     <List>
//                         <ListItem>
//                             <ListItemText primary="Name" secondary={fieldData.Name} />
//                             <Button onClick={() => handleEditOpen('Name', fieldData.Name)}>Edit</Button>
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Email" secondary={fieldData.Email} />
//                             <Button onClick={() => handleEditOpen('Email', fieldData.Email)}>Edit</Button>
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Contact" secondary={fieldData.Contact} />
//                             <Button onClick={() => handleEditOpen('Email', fieldData.Contact)}>Edit</Button>
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Sex" secondary={fieldData.Email} />
//                             <Button onClick={() => handleEditOpen('Email', fieldData.Email)}>Edit</Button>
//                         </ListItem>
//                     </List>
//                 </CardContent>
//             </Card>
//             <Divider />
//             <Card elevation={3}>
//                 <CardContent>
//                     <Typography variant="h6">Address</Typography>
//                     <List>
//                         <ListItem>
//                             <ListItemText primary="Street" secondary={fieldData.Street} />
//                             <Button onClick={() => handleEditOpen('Street', fieldData.Street)}>Edit</Button>
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="City" secondary={fieldData.City} />
//                             <Button onClick={() => handleEditOpen('City', fieldData.City)}>Edit</Button>
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="State" secondary={fieldData.State} />
//                             <Button onClick={() => handleEditOpen('State', fieldData.State)}>Edit</Button>
//                         </ListItem>
//                         <ListItem>
//                             <ListItemText primary="Zip Code" secondary={fieldData.ZipCode} />
//                             <Button onClick={() => handleEditOpen('ZipCode', fieldData.ZipCode)}>Edit</Button>
//                         </ListItem>
//                     </List>

//                 </CardContent>
//             </Card>
//             <Dialog open={editOpen} onClose={handleEditClose}>
//                 <DialogTitle>Edit {sectionName}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         fullWidth
//                         label={`Edit ${sectionName}`}
//                         value={editedValue}
//                         onChange={(e) => setEditedValue(e.target.value)}
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleEditClose}>Cancel</Button>
//                     <Button onClick={handleEditSave} variant="contained" color="primary">
//                         Save
//                     </Button>
//                 </DialogActions>
//             </Dialog>
//         </Container>
//     );
// };

// export default ProfileSection;

import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Container, MenuItem, Select , DialogTitle, DialogContent, DialogActions, Dialog} from '@mui/material';
import { collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../../config/firebase';

const ProfileSection = () => {
    const [userData, setUserData] = useState({
        name: '',
        address: '',
        sex: '',
        email: '',
        contactNo: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(db, 'Users', auth.currentUser.email);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    setUserData(userDocSnap.data());
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for the dialog

    const handleCloseDialog = () => {
        setIsDialogOpen(false); // Close the dialog
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleUpdateProfile = async () => {
        try {
            const userDocRef = doc(db, 'Users', auth.currentUser.email);
            await updateDoc(userDocRef, userData);
            setIsDialogOpen(true); // Open the dialog on success
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '20px' }}>
            <Typography variant="h4">Profile Section</Typography>
            <TextField
                name="name"
                label="Name"
                value={userData.name}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <TextField
                name="address"
                label="Address"
                value={userData.address}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />
            <Select
                name="sex"
                value={userData.sex}
                onChange={handleInputChange}
                sx={{ width: '100%' }}
            >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
            </Select>
            <TextField
                name="email"
                label="Email"
                value={userData.email}
                fullWidth
                margin="normal"
                disabled // Prevent email from being edited
            />
            <TextField
                name="contactNo"
                label="Contact No."
                value={userData.contactNo}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                inputProps={{ inputMode: 'tel' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateProfile}
                style={{ marginTop: '20px' }}
            >
                Update Profile
            </Button>

            {/* Success Dialog */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Success ✅</DialogTitle>
                <DialogContent>
                    Your profile has been updated successfully.
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>

        </Container>
    );
};

export default ProfileSection;
