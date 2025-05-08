import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';

/* Rotas a serem feitas */

// Rota para deletar um usuário (DELETE) /users/:email
router.delete('/user', async (req, res) => {
    const user = req.body;
    try {
        await UserController.deleteUser(user.email);
        res.status(200).json({ mensagem: 'Usuário deletado com sucesso!' });
    } catch (e) {
        res.status(500).json({ mensagem: "Erro ao deletar usuário", detalhes: e.message });;
    }
});

// Rota para atualizar os dados de um usuário via email (PUT) /users/:email
router.put('/user', async (req, res) => {
    const user = req.body;
    try {
        await UserController.updateUser(user.email, user.name);
        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso!' });
    } catch (e) {
        res.status(500).json({ mensagem: 'Erro ao atualizar usuário', detalhes: e.message });
    }
});

// Rota para criar usuário
router.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
        await UserController.createUser(name, email);
        res.status(200).json({ mensagem: 'Usuário criado com sucesso!' });
    } catch (e) {
        res.status(500).json({ mensagem: "Erro ao criar usuário", detalhes: e.message });
    }
})

// Rota para buscar um usuário via email (GET) /user
router.get('/user', async (req, res) => {
    const email = req.query.email;
    try {
        const user = await UserController.findByEmail(email);
        if (!user) {
            res.status(404).json({ mensagem: "Usuário não encontrado" });
            return; 
        }
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({ mensagem: "Usuário não encontrado", detalhes: e.message });
    }
})

// Rota para listar todos os usuários
router.get('/users', async (req, res) => {
    try {
        const users = await UserController.listAll();
        res.status(200).json(users);
    } catch (e) {
        res.status(500).json({ mensagem: "Erro ao listar usuários", detalhes: e.message });
    }
})
export default router;
