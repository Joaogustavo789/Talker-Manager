const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
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
const swaggerFile = require('../swagger_output.json');

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
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  res.status(200).json(talkers);
});

app.get('/talker/search', validateToken, async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const { q } = req.query;
  const filterSearch = talkers.filter((talkerSearch) => talkerSearch.name
  .includes(q));
  res.status(200).json(filterSearch);
});

app.get('/talker/:id', async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const idManager = talkers.find(({ id }) => (
    id === Number(req.params.id)
  ));
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
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const newTalker = { id: talkers.length + 1, ...req.body };
  talkers.push(newTalker);
  await fs.writeFile(pathTalker, JSON.stringify(talkers));
  res.status(201).json({ ...newTalker });
});

app.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalk,
validateWatchAt,
validateRate,
async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const { id } = req.params;
  const indexTalker = talkers.findIndex((talker) => talker.id === Number(id));
  talkers[indexTalker].name = req.body.name;
  talkers[indexTalker].age = req.body.age;
  talkers[indexTalker].talk.watchedAt = req.body.talk.watchedAt;
  talkers[indexTalker].talk.rate = req.body.talk.rate;
  await fs.writeFile(pathTalker, JSON.stringify(talkers));
  res.status(200).json({ ...talkers[indexTalker] });
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const talkers = JSON.parse(await fs.readFile(pathTalker, 'utf8'));
  const { id } = req.params;
  const indexTalker = talkers.findIndex((talker) => talker.id === Number(id));
  talkers.splice(indexTalker, 1);
  await fs.writeFile(pathTalker, JSON.stringify(talkers));
  res.status(204).end();
});

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));