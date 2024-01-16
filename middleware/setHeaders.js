module.exports = function (app) {
  try {
    app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      next();
    });
  } catch {
    res.status(400).send('Not validi token');
  }
};

