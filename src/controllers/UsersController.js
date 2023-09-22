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

    async update(request, response) {
        const { name, email } = request.body;
        const { id } = request.params;
        const database = await sqliteConnection();
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
        const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.");
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        await database.run(`
            UPDATE users SET
            name = ?,
            email = ?,
            updated_at = DATETIME('now')
            WHERE id = ?`,
            [user.name, user.email, id]
        );

        return response.json();
    }
}

module.exports = UsersController;