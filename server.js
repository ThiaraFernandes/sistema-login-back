//jeito antigo
// const express = require('express')

//jeito novo
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()

//habilita o cors
app.use(cors({
  origin: 'http://localhost:5173', // permite apenas o front rodando na porta 5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

//habilitando o express para receber json
app.use(express.json())

//primeira rota - LISTAR USUÁRIOS
app.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany()
    res.status(200).json(usuarios)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message })
  }

  // res.status(200).json(prisma)
})

//criando um usuário
app.post('/usuarios', async (req, res) => {
  try {
    const novoUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      }
    })

    res.status(201).json(novoUser)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message })
  }
})

//Editar usuário
app.put('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id
    const novoUser = await prisma.user.update({
      where: {id},
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      }
    })

    res.status(200).json(novoUser)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message })
  }
})

//deletar usuário
app.delete('/usuarios/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const usuarioDeletado = await prisma.user.delete({
      where: { id }
    });

    res.status(200).json(usuarioDeletado);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
  }
});


//escutando a porta
app.listen(3000)