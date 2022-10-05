const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();

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

app.post('/login', (_req, res) => {
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