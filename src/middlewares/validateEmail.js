const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const verifyEmail = (emails) => /\S+@\S+\.\S+/.test(emails);

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } 
  if (!verifyEmail(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  next();
};

module.exports = validateEmail;