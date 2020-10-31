const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authentication failed",
    });
  }
};
