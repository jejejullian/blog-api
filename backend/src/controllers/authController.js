import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      return res.status(400).json({ error: "Email sudah digunakan" });
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({ data: { email, username, password: hashed } });
    res.json({ message: "register berhasil" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "terjadi kesalahan pada server" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (!existing) {
      return res.status(401).json({ error: "user tidak ditemukan" });
    }

    const isMatch = await bcrypt.compare(password, existing.password);
    if (isMatch) {
      const token = jwt.sign({ id: existing.id, isAuthor: existing.isAuthor }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.json({ token });
    } else {
      res.status(401).json({ error: "incorrect password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};

export { register, login };
