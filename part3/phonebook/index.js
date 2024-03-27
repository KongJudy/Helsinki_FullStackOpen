const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.static('dist'));
app.use(cors());
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-person'
  )
);

morgan.token('post-person', function getPerson(req) {
  return req.method === 'POST' ? JSON.stringify(req.body) : ' ';
});

let DATA = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456'
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523'
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345'
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122'
  }
];

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>');
});

// data for all persons
app.get('/api/persons', (req, res) => {
  res.json(DATA);
});

// info page
app.get('/info', (req, res) => {
  const dataLength = DATA.length;
  // console.log(dataLength);
  const date = new Date().toString();
  // console.log(date);

  res.send(`<p>Phonebook has info for ${dataLength} people</p><p>${date}</p>`);
});

// display single phonebook entry
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = DATA.find((p) => p.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// deletes person from phonebook data
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  DATA = DATA.filter((person) => person.id !== id);

  res.status(204).end();
});

// generates random integer
const randomGen = () => Math.floor(Math.random() * 100 + 1);
// checks if the random integer is already taken
const foundId = (id) => DATA.find((p) => p.id === id);
// generates new number if number is taken
const generateId = () => {
  const id = randomGen();
  return foundId(id) ? generateId() : id;
};

app.post('/api/persons', (req, res) => {
  const body = req.body;

  // send error msg if name or number is not provided
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'name or number is missing'
    });
  }

  // send error msg if given name is already in the phonebook
  const foundName = DATA.find((p) => p.name === body.name);

  if (foundName) {
    return res.status(400).json({
      error: 'name must be unique'
    });
  }

  // generate new id
  const newId = generateId();

  const person = {
    name: body.name,
    number: body.number,
    id: newId
  };

  DATA = DATA.concat(person);
  res.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
