const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5003;

require('dotenv').config();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tripplanner')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const tripsRouter = require('./routes/trips');
app.use('/trips', tripsRouter);

app.get('/', (req, res) => {
  res.send('Welcome to the Trip Planner Website');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
