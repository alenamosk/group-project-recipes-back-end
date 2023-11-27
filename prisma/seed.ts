import recipe from "./data/recipes.json";
import comment from "./data/comments.json";
import categorie from "./data/categories.json";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seed = async () => {
  for (let i = 0; i < categorie.length; i += 1) {
    const categorieData = categorie[i];
    if (categorieData) {
      await prisma.category.create({ data: categorieData });
    }
  }

  for (let i = 0; i < recipe.length; i += 1) {
    const recipeData = recipe[i];
    if (recipeData) {
      await prisma.recipe.create({ data: recipeData });
    }
  }

  for (let i = 0; i < comment.length; i += 1) {
    const commentData = comment[i];
    if (commentData) {
      await prisma.comment.create({ data: commentData });
    }
  }
};

seed();
