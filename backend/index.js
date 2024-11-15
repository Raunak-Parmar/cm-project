const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/contactManagment', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Contact Schema
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  company: { type: String },
  jobTitle: { type: String },
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/contacts', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).send(newContact);
  } catch (error) {
    res.status(400).send({ error: 'Failed to add contact', details: error.message });
  }
});


app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch contacts' });
  }
});


app.put('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedContact) {
      return res.status(404).send({ error: 'Contact not found' });
    }
    res.send(updatedContact);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update contact', details: error.message });
  }
});


app.delete('/contacts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).send({ error: 'Contact not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete contact' });
  }
});


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
