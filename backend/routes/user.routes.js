const express = require("express");
const router = express.Router();

const usersController = require("../controllers/user.contrrollers");

router.get("/", usersController.getAll);
router.delete("/:id", usersController.deleteOne);
router.post("/register", usersController.register);

module.exports = router;
