const { Router } = require("express");
const userController = require("./controllers/userController");
const login = require("./middlewares/login")

const routes = Router();


routes.get("/users", userController.index);
routes.get("/users/:id", userController.show)
routes.post("/users/register", userController.store);
routes.post("/users/login", userController.login);
routes.put("/users/edit/:id", login, userController.update)
routes.delete("/users/delete/:id",login, userController.delete);

module.exports = routes;