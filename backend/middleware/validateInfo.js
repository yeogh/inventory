module.exports = (req, res, next) => {
    const { name, password, email } = req.body;

    function validPassword(userPassword) {
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(userPassword);
    }
  
    if (req.path === "/register") {
        if (!validPassword(password)) {
        return res.status(401).json("Password must contains min. 8 characters and at least one uppercase, one lowercase letter, one number & one special character");
      }
    } 
  
    next();
  };