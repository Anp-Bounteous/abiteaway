import { Router } from "express";
import { placeOrder, getMyOrders } from "../controllers/orderController.js";
import { authenticate } from "../middleware/authMiddleware.js";
const router = Router();
router.use(authenticate);
router.post("/", placeOrder);
router.get("/me", getMyOrders);
export default router;
//# sourceMappingURL=orderRoutes.js.map