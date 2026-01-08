module.exports = function (req, res, next) {
  // 401 Unauthorized or 403 Forbidden
  // Assumes req.user is set by authMiddleware
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admin only.' });
  }
};
