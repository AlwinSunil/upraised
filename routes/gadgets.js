import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  getGadgets,
  addGadget,
  updateGadget,
  decommissionGadget,
  selfDestructGadget,
} from "../controllers/gadgets.js";

const router = express.Router();

router.get("/", authMiddleware, getGadgets);
router.post("/", authMiddleware, addGadget);
router.patch("/:id", authMiddleware, updateGadget);
router.delete("/:id", authMiddleware, decommissionGadget);
router.post("/:id/self-destruct", authMiddleware, selfDestructGadget);

export default router;
