import { Router } from "express";
import { placeOrder, getOrdersByUser } from "../controllers/orderController";

const router = Router();

router.post("/", placeOrder);             // Place order
router.get("/:userId", getOrdersByUser); // Get orders by user

export default router;