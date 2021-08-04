const router = require("express").Router();
const {users}  = require("../../models");
const  { body }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");
const {isValidError} = require("../../assistant/assist");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post("/auth/signin", 
    body("login").exists().withMessage("write in field login"),
    body("password").exists().withMessage("write in field password"), 
    async (req, res, next) => {
        if (isValidError(req, next))
            return;
        const {login, password} = req.body; 
        try {
            const user = await users.findOne({
                where: {
                    login: login,
                }
            });
            if (!user) 
                throw BaseError.UnprocessableEntity("user not exist");//неверный логин или пароль
            const validPass = await bcrypt.compare(password, user.password);
            if (!validPass)
                throw BaseError.UnprocessableEntity("wrong login or password");
            const sign = jwt.sign({userId: user.id}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
            res.status(200).json({ token: sign  });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
);

module.exports = router;