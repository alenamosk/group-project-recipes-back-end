import recipe from "./data/recipes.json";
import comment from "./data/comments.json";
import categorie from "./data/categories.json";
import user from "./data/users.json";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedCategories = async () => {
  const categoryPromises = categorie.map((categoryData) =>
    prisma.category.create({ data: categoryData })
  );
  await Promise.all(categoryPromises);
};

const seedComments = async () => {
  const commentPromises = comment.map((commentData) =>
    prisma.comment.create({ data: commentData })
  );
  await Promise.all(commentPromises);
};

const seedUser = async () => {
  const userPromises = user.map((userData) =>
    prisma.user.create({ data: userData })
  );
  await Promise.all(userPromises);
};

const seedRecipes = async () => {
  const recipePromises = recipe.map((recipeData) =>
    prisma.recipe.create({ data: recipeData })
  );
  await Promise.all(recipePromises);
};

const seed = async () => {
  try {
    await seedCategories();
    await seedComments();
    await seedUser();
    await seedRecipes();
  } catch (e) {
    console.error("Error during seeding: ", e);
    throw e; // Re-throw the error to handle it in the final block if needed.
  } finally {
    await prisma.$disconnect();
  }
};

seed();

// const seed = async () => {
//   await seedCategoriesAndUsers();
//   await seedRecipes();
//   await seedComments();
// };

// seed();

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
