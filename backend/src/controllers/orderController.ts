import { Response } from "express";
import { prisma } from "../../lib/prisma.js";
import type { AuthRequest } from "../types/auth.js";

export const placeOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;
    const { total, status, items } = req.body;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const order = await prisma.$transaction(async (tx) => {
      const createdOrder = await tx.order.create({
        data: {
          userId,
          total,
          status,
          items: {
            create: items,
          },
        },
        include: { items: { include: { food: true } } },
      });

      await tx.cart.deleteMany({ where: { userId } });
      return createdOrder;
    });

    res.status(201).json(order);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const orders = await prisma.order.findMany({
      where: { userId },
      include: { items: { include: { food: true } } },
      orderBy: { createdAt: "desc" },
    });

    res.json(orders);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
