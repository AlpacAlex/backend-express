const router = require("express").Router();
//const assist = require("../../assistant/assist");
const {Todos}  = require("../../models");
const  { query, validationResult }  = require("express-validator");
const { BaseError } = require("../../assistant/ApiError");
const LIMIT = 5;

const isValid = () => {
    return [
        query("page").exists().withMessage("no exist page in get reqest").isInt({ min: 1 }).toInt().withMessage("no page specified"),
        query("orderBy").default("asc"),
    ]
} 
 
const getTasks = async (req, res, next) => {
    const er = validationResult(req);
    if (er.isEmpty()) {
        try {
            const {page, orderBy, filterBy} = req.query;
            const chosenTodos = await Todos.findAndCountAll({
                limit: LIMIT,
                offset: (page - 1) * LIMIT,
                order: [["createdAt", `${orderBy}`]],
                //where: false
            })
            res.status(200).json(chosenTodos);
        } catch (e) {
            console.log(e);
            next(e);
        }
    } else {
        console.log(er);
        next(er);
    }
}
 
router.get("/tasks", isValid(), getTasks);
 
module.exports = router;