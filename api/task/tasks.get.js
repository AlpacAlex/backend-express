const router = require("express").Router();
const {Todos}  = require("../../models");
const  { query }  = require("express-validator");
const {isValidError} = require("../../assistant/assist");

const LIMIT = 5;

const isValid = () => {
    return [
        query("page").exists().withMessage("no exist page in get reqest").isInt({ min: 1 }).toInt().withMessage("no page specified"),
        query("orderBy").default("asc"),
    ]
} 
// express wrap errors / wrap express validator
const getTasks = async (req, res, next) => {
    if (isValidError(req, next))
        return;
    try {
        const {page, orderBy, filterBy} = req.query;
        const where = filterBy && {done: filterBy === "done"};

        const chosenTodos = await Todos.findAndCountAll({
            limit: LIMIT,
            offset: (page - 1) * LIMIT,
            order: [["createdAt", `${orderBy}`]],
            where,
        });
        res.status(200).json(chosenTodos);
    } catch (e) {
        console.log(e);
        next(e);
    }
}
 
router.get("/tasks/:id", isValid(), getTasks);
 
module.exports = router;