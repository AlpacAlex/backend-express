const router = require("express").Router();
const assist = require("../../assistant/assist");
const  { query, validationResult }  = require("express-validator");
const LIMIT = 5;

const isValid = () => {
    return [
        query("page").exists().isInt({ min: 1 }).toInt().withMessage("no page specified"),
    ]
} 
 
const getTasks = async (req, res, next) => {
    const er = validationResult(req);
    if (er.isEmpty()) {
        let todos = await assist.read();
        const {page, orderBy, filterBy} = req.query;
        if (typeof orderBy === "undefined") {
            orderBy = "asc";
        }
        todos.sort( (a, b) =>  { return ( (orderBy === "asc") ? 
            ( (Date.parse(a.createdAt) - Date.parse(b.createdAt)) ? 1 : -1) : 
            ( (Date.parse(b.createdAt) - Date.parse(a.createdAt)) ? -1 : 1) )
        });
        todos = (typeof filterBy === "undefined") ? todos : todos.filter( (todo) => (todo.done === ((filterBy === "done") ? true : false)));
        todos = todos.slice(
                (page - 1) * LIMIT,
                (page - 1) * LIMIT + LIMIT
            );
        res.status(200).json(todos);
    } else {
        const firstError = er.errors[0].msg;
        res.status(400).json({ errors: firstError });
    }
    
}
 
router.get("/", isValid(), getTasks);
 
module.exports = router;