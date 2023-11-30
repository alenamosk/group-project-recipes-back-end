import express from 'express';
import { PrismaClient } from '@prisma/client';
import { json } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const app = express();

app.use(json());
app.use(cors());

app.use(cors());

const port = 3002;

const prisma = new PrismaClient();

// Your routes go underneath here

app.post('/register', async (req, res) => {
  const requestBody = req.body;
  if ('username' in requestBody && 'password' in requestBody) {
    try {
      await prisma.user.create({
        data: requestBody,
      });
      res.status(201).send({ message: 'User created!' });
    } catch (error) {
      // If we get an error, send back HTTP 500 (Server Error)
      res.status(500).send({ message: 'Something went wrong!' });
    }
  } else {
    // If we are missing fields, send back a HTTP 400
    res
      .status(400)
      .send({ message: "'username', 'password' and 'age' are required!" });
  }
});
app.post('/login', async (req, res) => {
  const requestBody = req.body;
  if ('username' in requestBody && 'password' in requestBody) {
    try {
      // First find the user
      const userToLogin = await prisma.user.findUnique({
        where: {
          username: requestBody.username,
        },
      });
      if (userToLogin && userToLogin.password === requestBody.password) {
        res.status(200).send({ message: 'User logged in!' }); // Here we should actually send back the Keycard
        return;
      }
      // If we didn't find the user or the password doesn't match, send back an error message
      res.status(400).send({ message: 'Login failed' });
    } catch (error) {
      // If we get an error, send back HTTP 500 (Server Error)
      res.status(500).send({ message: 'Something went wrong!' });
    }
  } else {
    // If we are missing fields, send back a HTTP 400
    res
      .status(400)
      .send({ message: "'username' and 'password' are required!" });
  }
});

app.get('/recipes', async (req, res) => {
  const allRecipes = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  res.send(allRecipes);
});

// id           Int        @id @default(autoincrement())
// name         String
// category     Category[]
// img_url      String
// instructions String
// ingredients  String
// prep_time    Int
// serves       Int
// Comment      Comment[]

app.get('/recipes/:id', async (req, res) => {
  const idAsNumber = parseInt(req.params.id);
  const oneRecipe = await prisma.recipe.findUnique({
    where: {
      id: idAsNumber,
    },
    select: {
      id: true,
      name: true,
      img_url: true,
      instructions: true,
      ingredients: true,
      prep_time: true,
      serves: true,
      Comment: true,
    },
  });
  if (!oneRecipe) {
    res.status(404).send({ message: 'Recipe with that id not found' });
    return;
  }
  res.send(oneRecipe);
});

// app.post('/comment', async (req, res) => {
//   const requestBody = req.body;
//   console.log(requestBody);
//   const addComment = await prisma.comment.create({
//     data: requestBody,
//   });
//   res.send(addComment);
// });

app.post('/comments', async (req, res) => {
  const requestBody = req.body;
  try {
    const addComment = await prisma.comment.create({
      data: requestBody,
    });

    res.send(addComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send({ error: 'Error adding comment' });
  }
});

// Resource: trees
// CRUD
// READ:
// GET /[resources] -> /trees
// GET /[resources]/:id -> /trees/:id
// CREATE:
// POST /[resources] -> /trees
// UPDATE:
// PATCH /[resources]/:id -> /trees/:id
// DELETE:
// DELETE /[resources]/:id -> /trees/:id

app.get('/comment/:id', async (req, res) => {
  const idAsNumber = parseInt(req.params.id);
  const allComments = await prisma.comment.findMany({
    where: {
      recipeId: idAsNumber,
    },
    select: {
      name: true,
      created_at: true,
      message: true,
      rating: true,
    },
  });
  if (!allComments) {
    res.status(404).send({ message: 'Comment with that id not found' });
    return;
  }
  res.send(allComments);
});
app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
