const express = require('express');

const routes = express.Router();

// Controllers
const SituationController = require('../Controllers/SituationController');
const BookController = require('../Controllers/BookController');
const GenreController = require('../Controllers/GenreController');
const BookGenreController = require('../Controllers/BookGenreController')


// Situations
routes.post('/situations',SituationController.post)
routes.get("/situations",SituationController.getAll)
routes.get("/situations/:id/",SituationController.getById);
routes.put("/situations/:id",SituationController.update)
routes.delete("/situations/:id", SituationController.delete)

// Books
routes.post("/books",BookController.post);
routes.get("/books",BookController.getAll);
routes.get("/books/:id",BookController.getById);
routes.put("/books/:id",BookController.update)
routes.delete("/books/:id", BookController.delete)

// Genres
routes.post("/genres",GenreController.post);
routes.get("/genres",GenreController.getAll);
routes.get("/genres/:id",GenreController.getById);
routes.put("/genres/:id",GenreController.update)
routes.delete("/genres/:id", GenreController.delete)

// Genres
routes.post("/bookGenres",BookGenreController.post);
routes.get("/bookGenres",BookGenreController.getAll);
routes.get("/bookGenres/:id",BookGenreController.getById);
routes.put("/bookGenres/:id",BookGenreController.update)
routes.delete("/bookGenres/:id", BookGenreController.delete)




module.exports = routes;