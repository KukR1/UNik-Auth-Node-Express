
// export async function findUserByEmail(email: string): Promise<User | null> {
//   const { rows } = await pool.query<User>('SELECT * FROM users WHERE email = $1', [email]);
//   if (rows.length) {
//     return rows[0];
//   }
//   return null;
// }
