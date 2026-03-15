import { Router } from "express";
import {
  addToCart,
  getMyCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authenticate);
router.post("/", addToCart);
router.get("/me", getMyCart);
router.put("/:id", updateCartItem);
router.delete("/:id", removeFromCart);

export default router;
