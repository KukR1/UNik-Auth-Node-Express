import express from 'express';
import bcrypt from 'bcrypt';
import { pool } from 'db/db';

export const register = async (req: express.Request, res: express.Response) => {
  const { email, password, name } = req.body;

  // Check if any required fields are missing or not strings
  if (!email || !password || !name || typeof password !== 'string') {
    return res.sendStatus(400); // Bad Request
  }

  try {
    // Check if the user already exists
    const userExist = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(409).send('User already exists'); // Conflict
    }

    // Hash password
    const saltRounds = 10; // Cost factor for hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user into the database
    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id, name, email;',
      [email, hashedPassword, name]
    );

    // Send success response
    res.status(201).json({
      id: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error'); // Internal Server Error
  }
}; 
