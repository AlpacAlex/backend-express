const router = require("express").Router();
const {users}  = require("../../models");
const  { body }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");
const {isValidError} = require("../../assistant/assist");
const bcrypt = require("bcrypt");


router.post("/auth/signin", 
    body("login").exists().withMessage("write in field login"),
    body("password").exists().withMessage("write in field password"), 
    async (req, res, next) => {
        if (isValidError(req, next))
            return;
        const {login, password} = req.body; 
        try {
            const salt = await bcrypt.genSalt(9227);
            const user = await users.findOne({
                where: {
                    login: login,
                }
            })
            if (!user) 
                throw BaseError.UnprocessableEntity("user not exist");//неверный логин или пароль
            const validPass = await bcrypt.compare(password, user.password);
            res.status(200).json({ userId: user.userId  });
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
);

module.exports = router;