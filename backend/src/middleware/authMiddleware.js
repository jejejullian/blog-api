import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Authorization failed. No access token." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({error: "Could not verify token"});
    }
    req.user = user;
    next();
  });
};

const requireAuthor = (req, res, next) => {
  if(!req.user.isAuthor) {
    return res.status(403).json({ error: 'Error 403 Forbidden' })
  }
  next()
}

export { authenticateToken, requireAuthor}