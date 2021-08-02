const router = require("express").Router();
const  { body, param }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");
const {Todos}  = require("../../models");
const {isValidError} = require("../../assistant/assist");


const isValid = () => {
    return [
        body("name").isLength({min: 2}).withMessage("task name must be greater than 1"),
        param("id").exists().withMessage("ID not found"),
        param("uuid").exists().withMessage("uuid is empty"),
    ]
} 

const patchTask = async (req, res, next) => {
    const { uuid } = req.params;
    const {name, done} = req.body;
    if (isValidError(req, next))
        return;
    try {
        const repitTodo = await Todos.findOne({
            where: {
                uuid: uuid,
            }
        });
        const repitName = await Todos.findOne({
            where: {
                name: name,
            }
        });
        if (repitTodo.name !== repitName.name)
            throw BaseError.UnprocessableEntity("name repit, create uniq");
            
        const result = await Todos.update({name: name, done: done}, {
            where: {
                uuid: uuid
            },
            returning: true,
            plain: true
        });
        //////////////////////////////
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

router.patch("/task/:id/:uuid", isValid(), patchTask);

module.exports = router;