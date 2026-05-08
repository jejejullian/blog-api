import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

const getAllPosts = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let showUnpublished = false;

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (user && user.isAuthor) {
          showUnpublished = true;
        }
      } catch (err) {
        // Token tidak valid, abaikan
      }
    }

    const posts = await prisma.post.findMany({ 
      where: showUnpublished ? {} : { published: true },
      orderBy: { createdAt: 'desc' }
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sistem gagal mengambil daftar post dari database" });
  }
};

const getPostById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let showUnpublished = false;

    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (user && user.isAuthor) {
          showUnpublished = true;
        }
      } catch (err) {
        // Token tidak valid
      }
    }

    const post = await prisma.post.findUnique({
      where: showUnpublished ? { id } : { id, published: true },
    });
    
    if (!post) return res.status(404).json({ error: "Post tidak ditemukan" });

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Terjadi kesalahan saat mengambil detail post" });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.id;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published: false,
      },
    });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database gagal menyimpan post baru Anda" });
  }
};

const updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { title, content } = req.body;
    const post = await prisma.post.update({
      where: {
        id,
      },
      data: { title, content },
    });

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sistem gagal memperbarui data post tersebut" });
  }
};

const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.post.delete({
      where: { id },
    });
    res.json({ message: "post berhasil dihapus" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menghapus post. Data mungkin sudah terhapus sebelumnya" });
  }
};

const togglePublish = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
    });

    const updated = await prisma.post.update({
      where: {
        id,
      },
      data: { published: !post.published },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengubah status publikasi (Publish/Unpublish)" });
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost, togglePublish };
