const Product = require("../models/product.model");

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json({
      msg: "Get all products",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    res.status(200).json({
      msg: "Get product by id",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const createNewProduct = async (req, res, next) => {
  try {
    const data = {
      category: req.body.categoryId,
      name: req.body.name,
      qtyPerUnit: req.body.qtyPerUnit,
      unitPrice: req.body.unitPrice,
      unitInStock: req.body.unitInStock,
      discontinued: req.body.discontinued,
    };
    const newProduct = new Product(data);

    const product = await newProduct.save();
    return res.status(201).json({
      msg: "New Product created",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.where({ _id: req.params.id }).update({
      ...req.body,
    });

    return res.status(200).json({
      msg: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({
      msg: "Product deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  createNewProduct,
  updateProduct,
  deleteProduct,
};
