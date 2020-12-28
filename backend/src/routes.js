const { Router } = require("express");
const userController = require("./controllers/userController");

const routes = Router();

routes.get("/", (req, res) => {
  res.json({
    message: "Teste"
  })
})
routes.get("/users", userController.index);
routes.post("/users", userController.store);

module.exports = routes;