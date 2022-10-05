const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateToken = require('./middlewares/validateToken');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchAt = require('./middlewares/validateWatchAt');
const validateRate = require('./middlewares/validateRate');

const app = express();
app.use(express.json());

app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const pathTalker = path.resolve(__dirname, '..', 'src', 'talker.json');

// não remova esse endpoint, e para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talker = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  res.status(200).json(talker);
});

app.get('/talker/:id', async (req, res) => {
  const talker = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const idManager = talker.find(({ id }) => (
    id === Number(req.params.id)
  ));
  // console.log(idManager);
  if (idManager) {
    res.status(200).json(idManager);
  } else {
    res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
});

app.post('/login', validateEmail, validatePassword, (_req, res) => {
  const genericToken = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  .split('');
  const newToken = [];
  for (let index = 0; index < 16; index += 1) {
    const randomToken = (Math.random() * (genericToken.length - 1)).toFixed(0);
    newToken[index] = genericToken[randomToken];
  }
  const token = newToken.join('');
  res.status(200).json({ token });
});

app.post('/talker', 
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchAt,
validateRate,
async (req, res) => {
  const talker = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const newTalker = { id: talker.length + 1, ...req.body };
  talker.push(newTalker);
  await fs.writeFile(pathTalker, JSON.stringify(talker));
  res.status(201).json({ ...newTalker });
});