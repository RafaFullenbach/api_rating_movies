const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class MovieNotesController {
    async create(request, response) {
        const { title, description, rating, tags } = request.body;
        const { user_id } = request.params;

        if (rating < 0 || rating > 5) {
            throw new AppError("A nota do filme deve ser de 1 a 5");
        }

        const [note_id] = await knex("movie_notes").insert({
            title,
            description,
            rating,
            user_id
        });

        const movieTagsInsert = tags.map(name => {
            return {
                note_id,
                user_id,
                name
            }
        });

        await knex("movie_tags").insert(movieTagsInsert);

        response.json();
    }
}

module.exports = MovieNotesController;