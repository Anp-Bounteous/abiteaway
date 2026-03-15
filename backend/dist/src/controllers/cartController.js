import { prisma } from "../../lib/prisma.js";
export const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { foodId, quantity } = req.body;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const existingItem = await prisma.cart.findFirst({ where: { userId, foodId } });
        const cartItem = existingItem
            ? await prisma.cart.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity },
                include: { food: true },
            })
            : await prisma.cart.create({
                data: { userId, foodId, quantity },
                include: { food: true },
            });
        res.status(201).json(cartItem);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getMyCart = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const cartItems = await prisma.cart.findMany({
            where: { userId },
            include: { food: true },
        });
        res.json(cartItems);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const updateCartItem = async (req, res) => {
    try {
        let { id } = req.params;
        if (Array.isArray(id))
            id = id[0];
        const userId = req.userId;
        const { quantity } = req.body;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const existingItem = await prisma.cart.findUnique({ where: { id } });
        if (!existingItem || existingItem.userId !== userId) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        const cartItem = await prisma.cart.update({
            where: { id },
            data: { quantity },
            include: { food: true },
        });
        res.json(cartItem);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const removeFromCart = async (req, res) => {
    try {
        let { id } = req.params;
        if (Array.isArray(id))
            id = id[0];
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const existingItem = await prisma.cart.findUnique({ where: { id } });
        if (!existingItem || existingItem.userId !== userId) {
            return res.status(404).json({ error: "Cart item not found" });
        }
        await prisma.cart.delete({ where: { id } });
        res.json({ message: "Item removed from cart" });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};
//# sourceMappingURL=cartController.js.map