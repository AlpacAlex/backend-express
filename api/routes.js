const router = require("express").Router();
// import function(controller)

router.get("/", (req, res) => {
    res.send("ger request !!!");
});

module.exports = router;