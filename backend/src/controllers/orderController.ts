import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

// Place order
export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { userId, total, status, items } = req.body; // items = [{ foodId, quantity }]
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status,
        items: {          // ← use "items", not "OrderItem"
          create: items,
        },
      },
      include: { items: true },  // ← include the correct relation field
    });
    res.status(201).json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

// Get orders by user
export const getOrdersByUser = async (req: Request, res: Response) => {
  try {
    let { userId } = req.params; // params are usually string
    // ensure it's a string
    if (Array.isArray(userId)) userId = userId[0];

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: true },
    });
    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
