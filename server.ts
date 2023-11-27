import express from "express";
import { PrismaClient } from "@prisma/client";
import { json } from "express";

// This is a change
// Create an express app
const app = express();
//commit
// Tell the app to allow json in the request body
app.use(json());

const port = 3002;

// Create a prisma client
const prisma = new PrismaClient();

// Your routes go underneath here

app.get("/recepies", async (req, res) => {
  const allRecepies = await prisma.recipe.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  res.send(allRecepies);
});

app.listen(port, () => {
  console.log(`⚡ Server listening on port: ${port}`);
});
