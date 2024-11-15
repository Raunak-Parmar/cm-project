import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const ContactForm = ({ onAddContact, onSaveEditedContact, editingContact }) => {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
  });

  useEffect(() => {
    if (editingContact) {
      setContact(editingContact);
    }
  }, [editingContact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingContact) {
      onSaveEditedContact(contact); 
    } else {
      onAddContact(contact); 
    }
    setContact({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
    });
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      sx={{ 
        marginBottom: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        marginLeft: 2,  
        paddingLeft: 2   
      }}
    >
      <TextField
        label="First Name"
        fullWidth
        name="firstName"
        value={contact.firstName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Last Name"
        fullWidth
        name="lastName"
        value={contact.lastName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        fullWidth
        name="email"
        value={contact.email}
        onChange={handleChange}
        required
        type="email"
      />
      <TextField
        label="Phone Number"
        fullWidth
        name="phone"
        value={contact.phone}
        onChange={handleChange}
        required
        type="tel"
      />
      <TextField
        label="Company"
        fullWidth
        name="company"
        value={contact.company}
        onChange={handleChange}
      />
      <TextField
        label="Job Title"
        fullWidth
        name="jobTitle"
        value={contact.jobTitle}
        onChange={handleChange}
      />
      <Button 
  style={{ paddingLeft: '20px', width: '200px' }} 
  type="submit" 
  variant="contained" 
  color="primary"
>
  {editingContact ? 'Save Changes' : 'Add Contact'}
</Button>
    </Box>
  );
};

export default ContactForm;
