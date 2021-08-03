const router = require("express").Router();
const {users}  = require("../../models");
const  { body }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");
const { v4: uuidv4 } = require("uuid");
const {isValidError} = require("../../assistant/assist");
const bcrypt = require("bcrypt");


router.post("/auth/signup", 
    body("login").exists().withMessage("write in field login"),
    body("password").exists().withMessage("write in field password"), 
    async (req, res, next) => {
        if (isValidError(req, next))
            return;
        const {login, password} = req.body; 
        try {
            const existUser = await users.findOne({
                where: {
                    login: login
                }
            })
            if (existUser) 
                throw BaseError.UnprocessableEntity("this login already exists");
            const salt = await bcrypt.genSalt(9227);
            const hashpass = await bcrypt.hash(password, salt);
            const newItem = {
                login: login,
                password: hashpass,
                userId: uuidv4()
            }
            const user = await users.create(newItem);
            res.status(200).json({ userId: user.userId  });
        } catch (e) {
            next(e);
        }
    }
);

module.exports = router;