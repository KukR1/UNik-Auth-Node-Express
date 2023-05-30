import express from 'express';
import { get, merge } from 'lodash';
import { getUserBySessionToken } from '../db/users';

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) return res.status(403).json('Forbidden to delete user');
    if (currentUserId.toString() !== id)
      return res.status(403).json('Owner ID mismatch');

    next();
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: 'Something went wrong' });
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
