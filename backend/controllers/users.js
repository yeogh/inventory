const usersRouter = require("express").Router();
const bcrypt = require('bcrypt');
const pool = require("../db")
const jwtGenerator = require("../utils/jwtGenerator")
const validateInfo = require("../middleware/validateInfo")
const authorization = require("../middleware/authorization")


//Register 
usersRouter.post("/register", validateInfo, async (req, res) => {
    try {
    //destructure the req.body (name, email password)
    const { name, password, email } = req.body;

    //check if user exist (if yes, throw error)
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length !==0) {
        return res.status(401).json("user already exists")
    } 

    //bcrypt the user password
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bycryptPassword = await bcrypt.hash(password, salt);

    //insert new user in table
    const newUser = await pool.query("INSERT INTO users (name, password, email) VALUES ($1, $2, $3) RETURNING *", [name, bycryptPassword, email]);

    // res.json("new user added");
    // res.json(newUser.rows[0]);

    //generate jwt token
    const token = jwtGenerator(newUser.rows[0].user_id);

    res.json({token});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")
    }
})


//Login
usersRouter.post("/login", validateInfo, async (req, res) => {
    try {

        //destructure the req.body
        const {email, password} = req.body;

        //check if user exists (if no, throw error)
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length === 0) {
            return res.status(401).json("password/ email is incorrect")
        }

        //check if incoming password is the same as database password
        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        if (!validPassword) {
            return res.status(401).json("password/ email is incorrect")
        }

        //give them jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})


//Verify token is authentic
usersRouter.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})


  module.exports = usersRouter;
