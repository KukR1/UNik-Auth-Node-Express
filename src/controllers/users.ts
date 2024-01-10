import express from 'express';
import { deleteUserById, getUsers, getUserById } from '../db/users';

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: 'Cannot get users' });
  }
};

export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.error(error);
    return res
      .status(400)
      .json({ error: 'Something went wrong while deleting user' });
  }
};

export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) return res.status(400).json('No username with such ID');

    const user = await getUserById(id);

    if (!user) return res.status(400).json('No user with such ID');

    user.username = username;
    await user.save();

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ err: 'Failed to update user' });
  }
};
