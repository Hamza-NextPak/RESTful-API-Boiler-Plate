const express = require("express");
const {
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/products");
const Product = require("../models/Product");
const router = express.Router();
const advancedResults = require("../middleware/advancedResults");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(advancedResults(Product), getProducts)
  .post(protect, createProduct);
router
  .route("/:id")
  .put(protect, updateProduct)
  .delete(protect, deleteProduct)
  .get(getProduct);

module.exports = router;
