const router = require("express").Router();
const assist = require("../../assistant/assist");
const  { body, validationResult }  = require("express-validator");

const isValid = () => {
    return [
        body("name").isLength({min: 2}).withMessage("task name must be greater than 1")
    ]
} 


const postTask = async (req, res, next) => {
    const { id } = req.params;

    const er = validationResult(req);
    if (er.isEmpty()) {
        const message = req.body.name;
        const todo = await assist.write(message);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(422).json({ errors: "name already exists"});
        }
        
    } else {
        const firstError = er.errors[0].msg;// если отображать все ошибки, то на фронте из-за разной структуры ответа ошибки придется по разному отображать
        res.status(400).json({ errors: firstError });
    }
}

router.post("/:id", isValid(), postTask);

module.exports = router;