import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import router from './router';

// Load environment variables from .env file
dotenv.config();

// Create an instance of express application
const app = express();

// Database connection setup
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: parseInt(process.env.DB_PORT ?? '5432'),
});

pool.connect(err => {
  if (err) {
    console.error('Connection error', err);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});

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
