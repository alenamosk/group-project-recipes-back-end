import recipe from "./data/recipes.json";
import comment from "./data/comments.json";
import categorie from "./data/categories.json";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedCategories = async () => {
  const categoryPromises = categorie.map((categoryData) =>
    prisma.category.create({ data: categoryData })
  );
  await Promise.all(categoryPromises);
};

const seedRecipes = async () => {
  const recipePromises = recipe.map((recipeData) =>
    prisma.recipe.create({ data: recipeData })
  );
  await Promise.all(recipePromises);
};

const seedComments = async () => {
  const commentPromises = comment.map((commentData) =>
    prisma.comment.create({ data: commentData })
  );
  await Promise.all(commentPromises);
};

const seed = async () => {
  try {
    // Seed categories first because other tables depend on them
    await seedCategories();
    // After categories, seed recipes.
    await seedRecipes();
    // Lastly, seed comments which may depend on recipes (and hence categories).
    await seedComments();
  } catch (e) {
    console.error("Error during seeding: ", e);
    throw e; // Re-throw the error to handle it in the final block if needed.
  } finally {
    await prisma.$disconnect();
  }
};

seed();

// const seed = async () => {
//   for (let i = 0; i < categorie.length; i += 1) {
//     const categorieData = categorie[i];
//     if (categorieData) {
//       await prisma.category.create({ data: categorieData });
//     }
//   }

//   for (let i = 0; i < recipe.length; i += 1) {
//     const recipeData = recipe[i];
//     if (recipeData) {
//       await prisma.recipe.create({ data: recipeData });
//     }
//   }

//   for (let i = 0; i < comment.length; i += 1) {
//     const commentData = comment[i];
//     if (commentData) {
//       await prisma.comment.create({ data: commentData });
//     }
//   }
// };

// seed();
