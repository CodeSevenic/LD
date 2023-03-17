const express = require('express');
const app = express();
const opn = require('open');
const cors = require('cors');
const { listsObject } = require('./controllers/contacts');
const port = process.env.PORT || 2000;
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Set CORS headers
app.use(cors());
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

console.log('Hello world');

app.post('/api/contact-lists', listsObject);

app.get('/error', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.write(`<h4>Error: ${req.query.msg}</h4>`);
  res.end();
});

app.listen(port, () => console.log(`=== Starting your app on http://localhost:${port} ===`));

opn(`http://localhost:${port}`);
