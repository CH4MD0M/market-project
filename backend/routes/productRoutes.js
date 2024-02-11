const express = require("express");
const router = express.Router();
const {
  getProducts,
  getProductById,
  adminGetProducts,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUploadProductImage,
  adminDeleteProductImage,
  deleteCloudinaryImage,
} = require("../controllers/productController");

const {
  verifyIsLoggedIn,
  verifyIsAdmin,
} = require("../middleware/verifyAuthToken");

router.get("/category/:categoryName", getProducts);
router.get("/", getProducts);
router.get("/get-one/:id", getProductById);

// Admin Routes
router.use(verifyIsLoggedIn);
router.use(verifyIsAdmin);
router.get("/admin", adminGetProducts);
router.delete("/admin/:id", adminDeleteProduct);
router.delete(
  "/admin/image/:imagePath/:productId/:publicId",
  adminDeleteProductImage
);
router.delete("/admin/cloudinary/:publicId", deleteCloudinaryImage);
router.put("/admin/:id", adminUpdateProduct);
router.post("/admin/upload", adminUploadProductImage);
router.post("/admin", adminCreateProduct);

module.exports = router;
