"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
// Habilita o CORS
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://loginusuarios.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));
// Permitir JSON
app.use(express_1.default.json());
// Rota raiz para teste
app.get('/', (req, res) => {
    res.json({ message: 'API funcionando!' });
});
// ROTAS
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await prisma.user.findMany();
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
    }
});
app.post('/usuarios', async (req, res) => {
    try {
        const novoUser = await prisma.user.create({
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age,
            }
        });
        res.status(201).json(novoUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
});
app.put('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const novoUser = await prisma.user.update({
            where: { id },
            data: {
                email: req.body.email,
                name: req.body.name,
                age: req.body.age,
            }
        });
        res.status(200).json(novoUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
    }
});
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const usuarioDeletado = await prisma.user.delete({
            where: { id }
        });
        res.status(200).json(usuarioDeletado);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
    }
});
exports.default = app;
