import express from 'express';
import { PrismaClient } from '@prisma/client';
import { json } from 'express';
import cors from 'cors';

// This is a change
// Create an express app
const app = express();
//commit
// Tell the app to allow json in the request body
app.use(json());
app.use(cors());

app.use(cors());

const port = 3002;

// Create a prisma client
const prisma = new PrismaClient();

// Your routes go underneath here

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
