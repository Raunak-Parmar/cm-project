import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit'; 
import DeleteIcon from '@mui/icons-material/Delete'; 

const ContactsTable = ({ contacts, onEditContact, onDeleteContact }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" padding={2}>
        <span>First Name</span>
        <span>Last Name</span>
        <span>Email</span>
        <span>Phone</span>
        <span>Company</span>
        <span>Job Title</span>
        <span>Actions</span>
      </Box>

      {contacts
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((contact) => (
          <Box key={contact.email} display="flex" justifyContent="space-between" padding={2}>
            <span>{contact.firstName}</span>
            <span>{contact.lastName}</span>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
            <span>{contact.company}</span>
            <span>{contact.jobTitle}</span>
            <Box>
              <IconButton onClick={() => onEditContact(contact)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => onDeleteContact(contact)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        ))}

      <Box display="flex" justifyContent="flex-end" padding={2}>
        <Button onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}>Previous</Button>
        <Button onClick={() => handleChangePage(null, page + 1)} disabled={page >= Math.ceil(contacts.length / rowsPerPage) - 1}>Next</Button>
      </Box>

      <Box display="flex" justifyContent="flex-end" padding={2}>
        <span>Rows per page:</span>
        <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
        </select>
      </Box>
    </Box>
  );
};

export default ContactsTable;
