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

/**
 * @swagger
 * tags:
 *   name: Gadgets
 *   description: API for managing gadgets
 */

/**
 * @swagger
 * /api/gadgets:
 *   get:
 *     summary: Retrieve a list of gadgets
 *     tags: [Gadgets]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter gadgets by status
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of gadgets
 *       500:
 *         description: Internal server error
 */
router.get("/", authMiddleware, getGadgets);

/**
 * @swagger
 * /api/gadgets:
 *   post:
 *     summary: Add a new gadget
 *     tags: [Gadgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the gadget
 *                 example: "Smartphone"
 *     responses:
 *       201:
 *         description: Gadget created successfully
 *       400:
 *         description: Name is required
 *       500:
 *         description: Internal server error
 */
router.post("/", authMiddleware, addGadget);

/**
 * @swagger
 * /api/gadgets/{id}:
 *   patch:
 *     summary: Update an existing gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the gadget to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Gadget updated successfully
 *       400:
 *         description: At least one field (name or status) is required
 *       500:
 *         description: Internal server error
 */
router.patch("/:id", authMiddleware, updateGadget);

/**
 * @swagger
 * /api/gadgets/{id}:
 *   delete:
 *     summary: Decommission a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the gadget to decommission
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", authMiddleware, decommissionGadget);

/**
 * @swagger
 * /api/gadgets/{id}/self-destruct:
 *   post:
 *     summary: Initiate self-destruct sequence for a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the gadget to self-destruct
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Self-destruct sequence initiated
 *       400:
 *         description: Gadget ID is required
 *       404:
 *         description: Gadget not found
 *       500:
 *         description: Internal server error
 */
router.post("/:id/self-destruct", authMiddleware, selfDestructGadget);

export default router;
