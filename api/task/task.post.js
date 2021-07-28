const router = require("express").Router();
const assist = require("../../assistant/assist");
const {Todos}  = require("../../models");
const  { body, validationResult }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");
const { v4: uuidv4 } = require("uuid");


const isValid = () => {
    return [
        body("name").isLength({min: 2}).withMessage("task name must be greater than 1"),
    ]
} 


const postTask = async (req, res, next) => {
    const { id } = req.params;
    try {
        const er = validationResult(req);
        if (er.isEmpty()) {
            const message = req.body.name;
            try {
                const newItem = {
                    uuid: uuidv4(),
                    name: message,
                    done: false
                }
                const todo = await Todos.create(newItem);
                res.status(200).json(todo);
            } catch (e) {
                next(BaseError.Error422(e));
            }
            
        } else {
            throw er;
        }
    } catch (e) {
        next(BaseError.Error422(e.errors[0].msg));
    }
}

router.post("/task/:id", isValid(), postTask);

module.exports = router;