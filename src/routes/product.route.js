const express = require("express");

const {
  deleteProduct,
  updateProduct,
  createNewProduct,
  getProductById,
  getProducts,
} = require("../controllers/product.controller");
const router = express.Router();

// get all products
router.get("/", getProducts);

// get product by product id
router.get("/:id", getProductById);

// create new product
router.post("/", createNewProduct);

// update product

router.put("/:id", updateProduct);

// delete product
router.delete("/:id", deleteProduct);

module.exports = router;
