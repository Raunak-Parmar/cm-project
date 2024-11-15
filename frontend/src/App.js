import React, { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null); 

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const editContact = (contact) => {
    setEditingContact(contact); 
  };

  const saveEditedContact = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.email === updatedContact.email ? updatedContact : contact
    );
    setContacts(updatedContacts);
    setEditingContact(null); 
  };

  const deleteContact = (contactToDelete) => {
    setContacts(contacts.filter(contact => contact !== contactToDelete));
  };

  return (
    <div>
      <h1 style={{ paddingLeft: '30px' }}>Contact Manager</h1>

    
      <ContactForm
        onAddContact={addContact}
        onSaveEditedContact={saveEditedContact}
        editingContact={editingContact} 
      />

      
      <ContactsTable
        contacts={contacts}
        onEditContact={editContact}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

export default App;
