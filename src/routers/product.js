import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  removeProduct,
  updateProduct,
} from "../controllers/product";

const router = Router();
router.get("/products", getAllProducts);
router.post("/products", createProduct);
router.get("/products/:id", getProductById);
router.delete("/products/:id", removeProduct);
router.put("/products/:id", updateProduct);

export default router;
