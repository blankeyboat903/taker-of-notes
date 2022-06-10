const express = require('express');
const path = require('path');
const fs = require('fs')
const apiRoutes = require('./routes/apiRoutes');
const disRoutes = require('./routes/disRoutes')

const app = express();
const PORT = process.env.port || 3001;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', disRoutes);

app.use(express.static('public'));


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);