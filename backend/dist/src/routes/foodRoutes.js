import { Router } from "express";
import { getFoods, getFoodById } from "../controllers/foodController.js";
const router = Router();
router.get("/", getFoods); // Get all foods
router.get("/:id", getFoodById); // Get food by ID
export default router;
//# sourceMappingURL=foodRoutes.js.map