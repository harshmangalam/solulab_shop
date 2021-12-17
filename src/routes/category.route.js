const express = require("express");

const {
  deleteCategory,
  updateCategory,
  createNewCategory,
  getCategoryById,
  getCategories,
} = require("../controllers/category.controller");
const router = express.Router();

// get all Categories
router.get("/", getCategories);

// get Category by Category id
router.get("/:id", getCategoryById);

// create new Category
router.post("/", createNewCategory);

// update Category

router.put("/:id", updateCategory);

// delete Category
router.delete("/:id", deleteCategory);

module.exports = router;
