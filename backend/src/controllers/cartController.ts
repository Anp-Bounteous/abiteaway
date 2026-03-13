import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

// Add item to cart
export const addToCart = async (req: Request, res: Response) => {
  try {
    const { userId, foodId, quantity } = req.body;
    const cartItem = await prisma.cart.create({
      data: { userId, foodId, quantity },
    });
    res.status(201).json(cartItem);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get cart by user
export const getCartByUser = async (req: Request, res: Response) => {
  try {
    let { userId } = req.params;
    if (Array.isArray(userId)) userId = userId[0];
    const cartItems = await prisma.cart.findMany({ where: { userId } });
    res.json(cartItems);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Remove item from cart
export const removeFromCart = async (req: Request, res: Response) => {
  try {
    let { id } = req.params;
    if (Array.isArray(id)) id = id[0];
    await prisma.cart.delete({ where: { id } });
    res.json({ message: "Item removed from cart" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};