import { where } from 'sequelize';
import User from '../models/user.js';

class UserController {

    async createUser(name, email) {
        const user = await User.create({ name, email });
        console.log('Usuário criado: ', user.toJSON());
    }

    async listAll() {
        const users = await User.findAll();
        return users.map(u => u.toJSON());
    }

    async findByEmail(email) {
        const user = User.findOne({ where: { email } });
        return user;
    }

    async updateUser(email, name) {
        const [affectedRows] = await User.update(
            { name: name },
            { where: { email } }
        );

        if (affectedRows === 0) {
            throw new Error("Nenhum usuário encontrado com este email");
        }
        console.log('Usuário atualizado com sucesso.');
    }

    async deleteUser(email) {
        await User.destroy({ where: { email } });
        console.log('Usuário deletado com sucesso.');
    }
}

export default new UserController();
