import express from 'express';
// import { getUserByEmail, createUser } from '../db/users';
// import { authentication, random } from '../helpers';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';



// export const login = async (req: express.Request, res: express.Response) => {

// };

export const register = async (req: express.Request, res: express.Response) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) return res.sendStatus(400);

};
