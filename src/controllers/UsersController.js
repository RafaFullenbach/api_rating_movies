const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { hash, compare } = require("bcrypt");

class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body;
        const [checkUsersExists] = await knex("users").where("email", email);
        const hashedPassword = await hash(password, 8);

        if (checkUsersExists) {
            throw new AppError("Este e-mail já está em uso.");
        }

        await knex("users").insert({ name, email, password: hashedPassword });

        return response.status(201).json();
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const { id } = request.params;
        // const database = await sqliteConnection();
        // const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
        const [user] = await knex("users").where("id", id);
        // const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]);
        const [userWithUpdatedEmail] = await knex("users").where("email", email);

        if (!user) {
            throw new AppError("Usuário não encontrado");
        }

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
            throw new AppError("Este e-mail já está em uso.");
        }

        if (password && !old_password) {
            throw new AppError("Você precisa informar a senha antiga para definir a nova senha");
        }

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password);

            if (!checkOldPassword) {
                throw new AppError("A senha antiga não confere.");
            }

            user.password = await hash(password, 8);
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        await knex("users").update({name, email, password: user.password, updated_at: knex.fn.now()}).where("id", id);

        return response.json();
    }
}

module.exports = UsersController;