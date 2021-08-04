const router = require("express").Router();
const  { body, param }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");
const {Todos}  = require("../../models");
const {isValidError} = require("../../assistant/assist");
const verifyToken = require("../../assistant/auth");


router.patch("/task/:uuid",
    verifyToken, 
    body("name").isLength({min: 2}).withMessage("task name must be greater than 1"),
    param("id").exists().withMessage("ID not found"),
    param("uuid").exists().withMessage("uuid is empty"), 
    async (req, res, next) => {
        const { uuid } = req.params;
        const {name, done} = req.body;
        if (isValidError(req, next))
            return;
        try {
            const repeatTodo = await Todos.findOne({
                where: {
                    uuid: uuid,
                }
            });
            const repeatName = await Todos.findOne({
                where: {
                    name: name,
                }
            });
            if (repeatTodo.name !== repeatName.name)
                throw BaseError.UnprocessableEntity("name repeat, create uniq");
                
            //проверить на возвращение !!!!
            const result = await Todos.update({name: name, done: done}, {
                where: {
                    uuid: uuid
                },
                returning: true,//новый параметр
                plain: true
            });
            console.log(result);
            const upTask = await Todos.findOne({
                where: {
                    uuid: uuid
                }
            });
            res.status(200).json(upTask);
        } catch (e) {
            next(e);
        }  
    }
);

module.exports = router;