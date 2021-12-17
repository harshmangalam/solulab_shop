const Category = require("../models/category.model");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      msg: "Get all categories",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json({
      msg: "Get category by id",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const createNewCategory = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
    };
    const newCategory = new Category(data);

    const category = await newCategory.save();
    return res.status(201).json({
      msg: "New Category created",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.where({ _id: req.params.id }).update({
      ...req.body,
    });

    return res.status(200).json({
      msg: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.status(200).json({
      msg: "Category deleted successfully",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createNewCategory,
  updateCategory,
  deleteCategory,
};
