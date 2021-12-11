require('dotenv').config();
const http = require('http');
const morgan = require('morgan');
const app = require('./app/app');
const router = require('./routes/router');
const connectDB = require('./db/mongodb');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

//setting default startpoint of api with EndPoint router
app.use(morgan('dev'));
app.use('/api/v1/messenger/', router);
//connect Mongodb and server on default ENV PORT
const startServerAndMongodb = async () => {
  await connectDB(process.env.MONGO_URI);

  server.listen(PORT, () => {
    console.log(`Backend Server listening on port ${PORT}`);
  });
};
//calling server and DB start function
startServerAndMongodb();
