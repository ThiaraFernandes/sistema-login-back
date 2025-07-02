import cors from 'cors';
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

// Habilita o CORS
app.use(cors({
  origin: ['http://localhost:5173', 'https://loginusuarios.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

// Permitir JSON
app.use(express.json());

// Rota raiz para teste
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API funcionando!' });
});

// ROTAS
app.get('/usuarios', async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.user.findMany();
    res.status(200).json(usuarios);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
  }
});

app.post('/usuarios', async (req: Request, res: Response) => {
  try {
    const novoUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      }
    });
    res.status(201).json(novoUser);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
});

app.put('/usuarios/:id', async (req: Request, res: Response) => {
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
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
  }
});

app.delete('/usuarios/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const usuarioDeletado = await prisma.user.delete({
      where: { id }
    });
    res.status(200).json(usuarioDeletado);
  } catch (error: any) {
    res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
  }
});

export default app;