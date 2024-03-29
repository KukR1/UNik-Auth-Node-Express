import express from 'express';
import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) return res.sendStatus(400);

    const user = await getUserByEmail(email).select(
      '+authentication.salt +authentication.password'
    );

    if (!user) return res.sendStatus(400);

    if (!user.authentication || !user.authentication.salt || !user.authentication.password) return res.sendStatus(400);

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.salt === expectedHash) return res.sendStatus(403);

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    res.cookie('NIK-AUTH', user.authentication.sessionToken, {
      domain: 'localhost',
    });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred' });
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) return res.sendStatus(400);

    const existingUser = await getUserByEmail(email);

    if (existingUser)
      return res.status(400).json({ error: 'User already exists' });

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: { salt, password: authentication(salt, password) },
    });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'An error occured' });
  }
};
