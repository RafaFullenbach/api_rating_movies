const { Router } = require("express");
const MovieNotesController = require("../controllers/MovieNotesController");

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const movieNotesRoutes = Router();
const movieNotesController = new MovieNotesController();

movieNotesRoutes.use(ensureAuthenticated);

movieNotesRoutes.get("/", movieNotesController.index);
movieNotesRoutes.get("/:id", movieNotesController.show);
movieNotesRoutes.post("/:user_id", movieNotesController.create);
movieNotesRoutes.delete("/:id", movieNotesController.delete);

module.exports = movieNotesRoutes;