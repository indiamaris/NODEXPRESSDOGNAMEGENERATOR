function server(app) {
  let PORT = process.env.PORT || 3000;
  if (process.env.NODE_ENV == 'test') {
    PORT = 0;
  }
  return app.listen(PORT, () => {
    console.log(`Listen on port ${PORT} please insert a real log in future`);
  });
}

module.exports = server;

