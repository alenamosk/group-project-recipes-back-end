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
  // await prisma.category.create({
  //   data: {
  //     id: 1,
  //     name: "breakfast",
  //     img_url: "🍳",
  //   },
  // });
  // await prisma.user.create({
  //   data: {
  //     id: 1,
  //     username: "Shruti",
  //     password: "Jain",
  //   },
  // });
  // await prisma.recipe.create({
  //   data: {
  //     id: 1,
  //     name: "Breakfast Burritos",
  //     categories: { create: { category: { connect: { id: 1 } } } },
  //     img_url: "https://i.imgur.com/ZMd0q7c.png",
  //     instructions:
  //       "Cook your preferred meat and vegetables. Scramble eggs and mix with the cooked meat and vegetables. Warm up tortillas and fill them with the mixture. Fold and serve warm.",
  //     ingredients: "Tortillas, eggs, meat, vegetables",
  //     prep_time: 30,
  //     serves: 4,
  //     userId: 1,
  //   },
  // });
  try {
    await seedCategories();
    await seedUser();
    await seedRecipes();
    await seedComments();
  } catch (e) {
    console.error("Error during seeding: ", e);
    throw e; // Re-throw the error to handle it in the final block if needed.
  } finally {
    await prisma.$disconnect();
  }
};

seed();
