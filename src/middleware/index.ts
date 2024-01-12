import express from 'express';
import { merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { sessionToken } = req.params;

    const currentUser = await getUserBySessionToken(sessionToken);

    if (!currentUser) return res.status(403).json({ error: 'Forbidden to delete user' });

    if (currentUser.authentication.sessionToken !== sessionToken)
      return res.status(403).json({ error: 'Owner ID mismatch' });

    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies['NIK-AUTH'];

    if (!sessionToken) return res.status(401).json({ err: 'Unauthorized' });

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser)
      return res.status(401).json({
        err: 'No user found with this session token, unauthenticated',
      });

    merge(req, { identity: existingUser });

    return next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ err: 'Unauthorized' });
  }
};
