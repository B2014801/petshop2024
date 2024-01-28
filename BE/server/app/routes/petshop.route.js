const express = require("express");
const router = express.Router();
const path = require("path");

const product = require("../controllers/Product/product.controller");
const cart = require("../controllers/cart/cart.controller");
const invoice = require("../controllers/invoice/invoice.controller");
const authController = require("../controllers/authController/auth.controller");
const authMiddleware = require("../controllers/authController/auth.middlewares");
const category = require("../controllers/Category/category.controller");
const uploadMiddleware = require("../middlewares/multer");
const brand = require("../controllers/brand/brand.controller");
const user = require("../controllers/user/user.controller");
const voucher = require("../controllers/voucher/voucher.controller");
const comment = require("../controllers/comments/comment.controller");
const notification = require("../controllers/notification/notification.controller");
const news = require("../controllers/news/news.controller");

router.route("/").get(product.home);

//product
router
  .route("/product")
  .get(product.getAllProduct)
  .post(authMiddleware.isAuth, uploadMiddleware.single("img"), product.create);

router
  .route("/product/:id")
  .put(authMiddleware.isAuth, uploadMiddleware.single("img"), product.update)
  .delete(authMiddleware.isAuth, product.deleteProduct)
  .get(product.findById)
  .post(authMiddleware.isAuth, cart.create);
//search with img
router
  .route("/product_img")
  .post(uploadMiddleware.single("img"), product.findByImg);
//cart
// router.route('/cart').get(authMiddleware.isAuth, cart.getAll);
router
  .route("/cart/:id")
  .get(authMiddleware.isAuth, cart.getAllOfOneUser)
  .post(authMiddleware.isAuth, authMiddleware.isAuth, cart.updateAmount);
router.route("/cart/deleteOneProduct").delete(cart.deleteOneProduct);

// router.get('/profile', authMiddleware, async (req, res) => {
//     res.send(req.user);
// });

// auth
router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.post("/auth/refresh", authController.refreshToken);
//user
router.route("/user/:id").get(user.findById).post(user.update);
router.get("/user", user.findAll);
router.route("/user/update").put(uploadMiddleware.single("img"), user.update);

//category
router
  .route("/category")
  .get(category.getAllCategory)
  .post(authMiddleware.isAuth, category.create);

router
  .route("/category/:id")
  .get(category.findById)
  .post(authMiddleware.isAuth, category.update)
  .delete(authMiddleware.isAuth, category.deleteCategory)
  .put(authMiddleware.isAuth, category.update);

// checkout
router
  .route("/invoice")
  .post(authMiddleware.isAuth, invoice.create)
  .get(authMiddleware.isAuth, invoice.getAllInvoiceOfOneUser)
  .put(authMiddleware.isAuth, invoice.updateStatus);
// user

//
router.route("/invoice/all").get(authMiddleware.isAuth, invoice.getAllInvoice);
router.route("/invoice/revenue").get(invoice.getRevenue);
//
brand;
router
  .route("/brand")
  .get(brand.getAllBrand)
  .post(authMiddleware.isAuth, uploadMiddleware.single("img"), brand.create);

router
  .route("/brand/:id")
  .put(authMiddleware.isAuth, uploadMiddleware.single("img"), brand.update)
  .delete(authMiddleware.isAuth, brand.deleteBrand)
  .get(brand.findById);
//
//voucher
router.route("/voucher").get(authMiddleware.isAuth, voucher.getAll);
router.route("/voucher/add").post(authMiddleware.isAuth, voucher.create);

router
  .route("/voucher/:id")
  .get(voucher.findById)
  .delete(authMiddleware.isAuth, voucher.delete);

router.route("/voucher/update/:id").post(authMiddleware.isAuth, voucher.update);

// Routes
// router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
const passport = require("passport");

// router.post('/auth/google/', authController.loginWithGG);
// comments
router.route("/comments").get(comment.getAll);
router.route("/comments/add").post(comment.create);
//notification
router
  .route("/notification")
  .post(notification.create)
  .get(notification.getAll);

router
  .route("/news")
  .post(authMiddleware.isAuth, uploadMiddleware.single("img"), news.createNews)
  .get(news.getNews);
router.route("/news/:id").delete(authMiddleware.isAuth, news.deleteNews);

module.exports = router;
