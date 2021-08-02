const router = require("express").Router();
const {Todos}  = require("../../models");
const  { body }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");
const { v4: uuidv4 } = require("uuid");
const {isValidError} = require("../../assistant/assist");



const isValid = () => {
    return [
        body("name").isLength({min: 2}).withMessage("task name must be greater than 1"),
    ]
} 


const postTask = async (req, res, next) => {
    if (isValidError(req, next))
        return;
    const message = req.body.name; 
    try {
        const repitTodo = await Todos.findAll({
            where: {
                name: message
            }
        })
        if (repitTodo.length) 
            throw BaseError.UnprocessableEntity("name repit, create uniq");
        const newItem = {
            uuid: uuidv4(),
            name: message,
            done: false
        }
        const todo = await Todos.create(newItem);
        res.status(200).json(todo);
    } catch (e) {
        next(e);
    }
}

router.post("/task/:id", isValid(), postTask);

module.exports = router;