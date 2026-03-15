import { Router } from "express";
import { placeOrder, getMyOrders } from "../controllers/orderController";
import { authenticate } from "../middleware/authMiddleware";
const router = Router();
router.use(authenticate);
router.post("/", placeOrder);
router.get("/me", getMyOrders);
export default router;
//# sourceMappingURL=orderRoutes.js.map