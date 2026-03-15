import { Request, Response } from "express";
import { prisma } from "../../lib/prisma.js";
import { seedFoods } from "../data/seedFoods.js";

// Get all foods
export const getFoods = async (req: Request, res: Response) => {
  try {
    let foods = await prisma.food.findMany();

    if (!foods.length) {
      await prisma.food.createMany({ data: seedFoods });
      foods = await prisma.food.findMany();
    }

    res.json(foods);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get food by ID
export const getFoodById = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;

    // If id is accidentally an array, take the first element
    if (Array.isArray(id)) id = id[0];

    const food = await prisma.food.findUnique({ where: { id } });
    if (!food) return res.status(404).json({ error: "Food not found" });

    res.json(food);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
