import { v4 as uuidv4 } from "uuid";
import { prisma } from "../index.js";

// GET /gadgets
const getGadgets = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const gadgets = await prisma.gadget.findMany({
      where: filter,
    });

    const gadgetsWithProbability = gadgets.map((gadget) => ({
      ...gadget,
      successProbability: Math.floor(Math.random() * 100) + 1,
    }));

    res.json(gadgetsWithProbability);
  } catch (err) {
    console.error("Error retrieving gadgets:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /gadgets
const addGadget = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }
  try {
    const newGadget = await prisma.gadget.create({
      data: {
        id: uuidv4(),
        name,
        status: "Available",
      },
    });
    res.status(201).json(newGadget);
  } catch (err) {
    console.error("Error adding gadget:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// PATCH /gadgets/:id
const updateGadget = async (req, res) => {
  const { id } = req.params;
  const { name, status } = req.body;

  if (!name && !status) {
    return res
      .status(400)
      .json({ message: "At least one field (name or status) is required" });
  }

  try {
    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: { name, status },
    });
    res.json(updatedGadget);
  } catch (err) {
    console.error("Error updating gadget:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE /gadgets/:id
const decommissionGadget = async (req, res) => {
  const { id } = req.params;
  try {
    const decommissionedGadget = await prisma.gadget.update({
      where: { id },
      data: {
        status: "Decommissioned",
      },
    });
    res.json(decommissionedGadget);
  } catch (err) {
    console.error("Error decommissioning gadget:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// POST /gadgets/:id/self-destruct
const selfDestructGadget = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Gadget ID is required" });
  }

  try {
    const gadget = await prisma.gadget.findUnique({ where: { id } });
    if (!gadget) {
      return res.status(404).json({ message: "Gadget not found" });
    }

    const confirmationCode = Math.floor(100000 + Math.random() * 900000);
    res.json({ message: "Self-destruct sequence initiated", confirmationCode });
  } catch (err) {
    console.error("Error initiating self-destruct:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getGadgets,
  addGadget,
  updateGadget,
  decommissionGadget,
  selfDestructGadget,
};
