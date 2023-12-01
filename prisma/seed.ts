import recipe from './data/recipes.json';
import comment from './data/comments.json';
import categorie from './data/categories.json';
import user from './data/users.json';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const seedCategoriesAndUsers = async () => {
  for (let i = 0; i < categorie.length; i += 1) {
    const categorieData = categorie[i];
    if (categorieData) {
      try {
        await prisma.category.create({ data: categorieData });
      } catch (error) {
        console.error('Error seeding category:', error);
      }
    }
  }

  for (let i = 0; i < user.length; i += 1) {
    const usertData = user[i];
    if (usertData) {
      await prisma.user.create({ data: usertData });
    }
  }
};

const seedRecipes = async () => {
  for (let i = 0; i < recipe.length; i += 1) {
    const recipeData = recipe[i];
    if (recipeData) {
      const categoryIds = Array.isArray(recipeData.categories)
        ? recipeData.categories.map((category) => category.categoryId)
        : [];

      try {
        await prisma.recipe.create({
          data: {
            id: recipeData.id,
            name: recipeData.name,
            categories: {
              connect: categoryIds.map((categoryId) => ({ id: categoryId })),
            },
            img_url: recipeData.img_url,
            instructions: recipeData.instructions,
            ingredients: recipeData.ingredients,
            prep_time: recipeData.prep_time,
            serves: recipeData.serves,
            userId: recipeData.userId,
          },
        });
      } catch (error) {
        console.error('Error seeding recipe:', error);
      }
    }
  }
};

const seedComments = async () => {
  for (let i = 0; i < comment.length; i += 1) {
    const commentData = comment[i];
    if (commentData) {
      await prisma.comment.create({ data: commentData });
    }
  }
};

const seed = async () => {
  await seedCategoriesAndUsers();
  await seedRecipes();
  await seedComments();
};

seed();
