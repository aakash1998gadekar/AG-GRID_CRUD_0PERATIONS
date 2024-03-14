const express = require('express');
require('dotenv').config();
const fs = require('fs');
const data = require('../backend/data/myData');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.get('/api', (req, res) => {
  res.send(data);
});

app.get('/api/:id', async (req, res) => {
  try {
    const singleData = data.data.find((row) => row.id === req.params.id);
    if (singleData) {
      res.send(singleData);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).send('Error retrieving data');
  }
});

app.post('/api', (req, res) => {
  try {
    data.data = [...data.data, req.body];
    fs.writeFileSync(path.join(__dirname, '../backend/data/myData.js'), `module.exports = ${JSON.stringify(data, null, 2)};`);
    res.status(200).send('Data Send successfully');
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Error updating data');
  }
});

app.put('/api/:id', async (req, res) => {
  try {
    const dataIndex = data.data.findIndex((row) => row.id === req.params.id);

    if (dataIndex !== -1) {
      data.data[dataIndex] = { ...data.data[dataIndex], ...req.body };
      fs.writeFileSync(path.join(__dirname, '../backend/data/myData.js'), `module.exports = ${JSON.stringify(data, null, 2)};`);
      res.status(200).send('Data updated successfully');
    } else {
      res.status(404).send('Data not found');
    }
  } catch (error) {
    console.error('Error updating data:', error);
    res.status(500).send('Error updating data');
  }
});

app.delete('/api/:id', async (req, res) => {
  try {
    const dataIndex = data.data.findIndex((row) => row.id === req.params.id);

    if (dataIndex !== -1) {
      data.data.splice(dataIndex, 1);
      fs.writeFileSync(path.join(__dirname, '../backend/data/myData.js'), `module.exports = ${JSON.stringify(data, null, 2)};`);
      res.status(200).send('Data deleted successfully');
    } else {
      res.status(404).send('Data not found');
    }
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Error deleting data');
  }
});

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`));