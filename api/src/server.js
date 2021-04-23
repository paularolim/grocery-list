const app = require('./app');

app.listen(8000, '192.168.0.104', (err, res) => {
  err ? console.error(err) : console.log('running on port 8000');
});
