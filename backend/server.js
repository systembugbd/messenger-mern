require('dotenv').config();
const http = require('http');
const app = require('./app/app');
const router = require('./routes/router');

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

app.use(router);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
