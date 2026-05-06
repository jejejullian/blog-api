import prisma from "../lib/prisma.js";

const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ where: { published: true } });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil daftar post" });
  }
};

const getPostById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({
      where: { id, published: true },
    });
    if (!post) return res.status(404).json({ error: "Post tidak ditemukan" });

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil post" });
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
    res.status(500).json({ error: "Gagal membuat post baru" });
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
    res.status(500).json({ error: "Gagal mengupdate post" });
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
    res.status(500).json({ error: "Gagal menghapus post" });
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
    res.status(500).json({ error: "gagal mengubah status publish" });
  }
};

export { getAllPosts, getPostById, createPost, updatePost, deletePost, togglePublish };
