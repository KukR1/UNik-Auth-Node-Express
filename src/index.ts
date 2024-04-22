import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './router';

const app = express();

// Middleware configuration
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

// Router setup
app.use('/', router());

// Create and start the HTTP server
const server = http.createServer(app);
server.listen(8080, () => {
  console.log('Server running on port http://localhost:8080/');
});
