module.exports = (role) => (req, res, next) => {
  if (req.role !== role) {
    return res.status(403).json({ error: "Access denied." });
  }
  next();
};
