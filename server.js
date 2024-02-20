// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Drink = require('./models/drink');

const app = express();

// Anslut till MongoDB-databasen
mongoose.connect('mongodb+srv://love:love@energidryck.vves83k.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));


// Uppdatera en dryck
app.post('/admin/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  await Drink.findByIdAndUpdate(id, { title });
  res.redirect('/admin');
});

// Visa adminpanelen
app.get('/admin', async (req, res) => {
  try {
    const drinks = await Drink.find();
    res.render('admin', { drinks });
  } catch (error) {
    console.error('Fel vid hämtning av drycker:', error);
    res.status(500).send('Ett fel inträffade vid hämtning av drycker.');
  }
});
// Lägg till en ny dryck
app.post('/admin/add', async (req, res) => {
  const { title, image, info, flavor } = req.body;
  const drink = new Drink({ title, image, info, flavor });
  await drink.save();
  res.redirect('/admin');
});

// Visa drycker på hemskärmen
app.get('/', async (req, res) => {
  const drinks = await Drink.find();
  res.render('home', { drinks });
});

// Starta servern
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
