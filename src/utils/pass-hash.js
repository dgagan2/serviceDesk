import bcrypt from 'bcrypt';

async function hashPassword (password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

async function verifyPassword (password, hash) {
  const Hash = await bcrypt.compare(password, hash);
  return Hash;
}

export { hashPassword, verifyPassword };
