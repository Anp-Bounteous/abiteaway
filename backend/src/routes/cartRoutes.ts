import { Router } from "express";
import { addToCart, getCartByUser, removeFromCart } from "../controllers/cartController";

const router = Router();

router.post("/", addToCart);                  // Add to cart
router.get("/:userId", getCartByUser);       // Get cart for user
router.delete("/:id", removeFromCart);       // Remove item from cart

export default router;