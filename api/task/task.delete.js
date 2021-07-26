const router = require("express").Router();
const assist = require("../../assistant/assist");
const  { body, validationResult, param }  = require("express-validator");


const isValid = () => {
    return [
        param("id").exists().withMessage({
            message: "ID not found",
            errorCode: 404
        }),
        param("uuid").exists().isLength({ min: 35, max:37 }).withMessage("uuid is empty"),
    ]
} 

const deleteTask = async (req, res, next) => {
    const { id, uuid } = req.params;


    const er = validationResult(req);
    if (er.isEmpty()) {
        if(await assist.remove(uuid)) {
            res.sendStatus(204);
        } else {
            res.status(404).json({ errors: "not find by uuid" });
        }
        
    } else {
        const firstError = er.errors[0].msg;
        res.status(400).json({ errors: firstError });
    }
    
}

router.delete("/:id/:uuid", isValid(), deleteTask);

module.exports = router;