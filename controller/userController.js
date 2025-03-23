const DBConnection = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { username, firstname, lastname, email, password } = req.body;

    if (!email || !password || !firstname || !lastname || !username) {
        return res.status(400).json({ msg: "Please fill all fields" });
    }

    if (password.length < 8) {
        return res.status(400).json({ msg: "Password must be at least 8 characters" });
    }

    try {
        const [user] = await DBConnection.query(
            "SELECT username, userid FROM users WHERE username = ? OR email = ?",
            [username, email]
        );

        if (user.length > 0) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await DBConnection.execute(
            "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
            [username, firstname, lastname, email, hashedPassword]
        );

        return res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "Server error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(401).json({ msg: "Please enter all the fields" });
    }

    try {
        const [user] = await DBConnection.query(
            "SELECT username, userid, password FROM users WHERE email = ?",
            [email]
        );

        if (user.length == 0) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Unauthorized" });
        }

        const username = user[0].username;
        const userid = user[0].userid;
        const token = jwt.sign({ username, userid }, process.env.JWT_SECRET, { expiresIn: '1d' });

        return res.status(200).json({ 
            msg: "User login successful", 
            token,
            user: { username, userid }
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Server faced an error" });
    }
};

async function checkUser(req, res) {
    const username = req.user.username;
    const userid = req.user.userid;
    return res.status(200).json({ 
        user: { username, userid } 
    });
}

module.exports = { register, login, checkUser };