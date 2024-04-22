import express from 'express';
import bcrypt from 'bcrypt';
import { prisma } from 'db/db';

interface RegisterRequestBody {
  email: string;
  username: string;
  fullname: string;
  password: string;
}

export const register = async (req: express.Request, res: express.Response) => {
  const { email, password, username, fullname } = req.body as RegisterRequestBody;

  if (!email || !password || !username || typeof email !== 'string' || typeof password !== 'string' || typeof username !== 'string' || (fullname && typeof fullname !== 'string')) {
    return res.status(400).send("Invalid input data");
  }

  try {
    const userExist = await prisma.user.findUnique({
      where: { email }
    });

    if (userExist) {
      return res.status(409).send('User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        fullname,
        password: hashedPassword
      }
    });

    res.status(201).json({
      id: user.id,
      email: user.email,
      username: user.username,
      fullname: user.fullname
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// export const login = async (req: express.Request, res: express.Response) => {
//   const { email, password } = req.body;

//   if (!email || !password || typeof password !== 'string') {
//     return res.sendStatus(400);
//   }

//   try {
//     const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

//     if (result.rows.length === 0) {
//       return res.status(401).send('Email or password is incorrect');
//     }

//     const user = result.rows[0];
//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       return res.status(401).send('Email or password is incorrect');
//     }

//     res.status(200).json({
//       name: user.name,
//       email: user.email
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error'); // Internal Server Error
//   }
// }