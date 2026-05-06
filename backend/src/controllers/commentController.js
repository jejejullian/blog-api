import prisma from "../lib/prisma.js";

const getCommentsByPost = async (req, res) => {
  const postId = parseInt(req.params.postId);
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
    });

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal mengambil komen post" });
  }
};

const createComment = async (req, res) => {
  try {
    const { content, guestName } = req.body;
    const { postId } = req.params;

    let comment;

    if (req.user) {
      comment = await prisma.comment.create({
        data: {
          content,
          postId: Number(postId),
          authorId: req.user.id,
          guestName: null,
        },
      });
    } else {
      comment = await prisma.comment.create({
        data: {
          content,
          postId: Number(postId),
          authorId: null,
          guestName,
        },
      });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: "Gagal membuat komentar" });
  }
};

const deleteComment = async (req, res) => {
  try {
     const commentId = parseInt(req.params.commentId)

     await prisma.comment.delete({
        where: {id: commentId}
     })

     res.json({message: 'Komentar berhasil dihapus'})
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Gagal menghapus comment",
    });
  }
};

export { getCommentsByPost, createComment, deleteComment }
