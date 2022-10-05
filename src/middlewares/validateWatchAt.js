const validateWatchAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const verifyDate = /(\d{2}?\/\d{2}?\/\d{4}?)/g;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!watchedAt.match(verifyDate)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

module.exports = validateWatchAt;