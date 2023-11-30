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
    res.status(404).send({ message: 'Recepie with that id not found' });
    return;
  }
  res.send(oneRecipe);
});

// add a new recipe
app.post("/recipes", async (req, res) => {
  const requestBody = req.body;

  if (
    "recipeName" in requestBody &&
    "instructions" in requestBody &&
    "ingredients" in requestBody &&
    "prepTime" in requestBody &&
    "serves" in requestBody &&
    "imgUrl" in requestBody &&
    "category" in requestBody
  ) {
    try {
      await prisma.recipe.create({
        data: requestBody,
      });
      res.status(201).send({ message: "Recipe created!" });
    } catch (error) {
      res.status(500).send({ message: "Something went wrong!" });
    }
  } else {
    res.status(400).send({
      message:
        "'recipe name', 'instructions', 'ingredients', 'prepTime', 'serves', 'imgUrl', 'category' are required!",
    });
  }
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
