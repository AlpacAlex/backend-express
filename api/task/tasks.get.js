const router = require("express").Router();
const {Todos}  = require("../../models");
const  { query, validationResult }  = require("express-validator");
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
            //const where = filterBy ? ((filterBy==="done") ? {done: true} : {done: false}) : null;
            //const where = filterBy && ((filterBy==="done") ? {done: true} : {done: false});
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
    } else {
        console.log(er);
        next(er);
    }
}
 
router.get("/tasks/:id", isValid(), getTasks);
 
module.exports = router;