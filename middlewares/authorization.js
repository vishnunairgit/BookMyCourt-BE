const jwt = require("jsonwebtoken");
// const { decodedToken } = require('react-jwt')

const userAuth = (req, res, next) => {
  try {
    // console.log(req.headers["authorization"], "headers");
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, "bookMyCourt", (err, decodedToken) => {
      if (decodedToken) {
        req.userID = decodedToken.userID;
        next();
      } else {
        res.status(400).json({ message:'unauthorized user'});
      }

    //   console.log(decodedToken, "decodedToken");
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message:'unauthorized user'})
  }
};

module.exports = { userAuth };


const adminAuth = (req, res, next) => {
  try {
    // console.log(req.headers["authorization"], "headers");
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, "bookMyCourt", (err, decodedToken) => {
      // console.log(decodedToken);
      if (decodedToken && decodedToken.role===1) {
        req.userID = decodedToken.userID;
        next();
      } else {
        res.status(401).json({ message:'unauthorized user'});
      }

    //   console.log(decodedToken, "decodedToken");
    });
  } catch (err) {
    // console.log(error);
    res.status(401).json({ message:'unauthorized user'});

  }
};

module.exports = { userAuth,adminAuth };

