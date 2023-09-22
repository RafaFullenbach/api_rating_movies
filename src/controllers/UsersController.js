const sqliteConnection = require("../database/sqlite");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcrypt");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;
        const database = await sqliteConnection();
        const checkUsersExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        const hashedPassword = await hash(password, 8);

        if (checkUsersExists) {
            throw new AppError("Este e-mail já está em uso.");
        }

        await database.run(
            "INSERT INTO users (name, email, password) VALUES (?,?,?)",
            [name, email, hashedPassword]
        );

        return response.status(201).json();
    }
}

module.exports = UsersController;