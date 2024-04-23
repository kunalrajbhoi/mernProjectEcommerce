const express = require('express');
const multer = require('multer');

const router = express.Router();

const userSignUpController = require("../controller/user/userSingUp");
const userSignInController = require('../controller/user/userSingIn');
const userDetailsController = require('../controller/user/userDetail');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user/userLogout');
const AllUsers = require('../controller/user/allUser');
const updateUser = require('../controller/user/updateUser');
const UploadProductController = require('../controller/product/uploadProduct');
const getProductController = require('../controller/product/getProduct');
const updateProductController = require('../controller/product/updateProduct');
const getCategoryProduct = require('../controller/product/getCategoryProductOne');
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct');
const getProductDetails = require('../controller/product/getProductDetails');
const addToCartController = require('../controller/user/addToCartController');
const countAddToCartProduct = require('../controller/user/countAddToCartProduct');
const addToCartViewProduct = require('../controller/user/addToCartViewProduct');
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct');
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct');
const searchProduct = require('../controller/product/searchProduct');
const filterProductController = require('../controller/product/filterProduct');

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the destination directory for uploads
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        // Specify the filename for uploaded files
        cb(null, file.originalname);
    }
});

// Initialize multer with the storage engine
const upload = multer({ storage: storage });

// Routes with multer middleware for file upload
router.post("/signup", upload.single('profilePic'), userSignUpController);
router.post("/login", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout",userLogout)

//admin panel
router.get("/all-user",authToken,AllUsers)
router.post("/update-user",authToken,updateUser)

//product
router.post("/upload-product",authToken,UploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)
router.get("/get-categoryProduct",getCategoryProduct)
router.post("/category-product",getCategoryWiseProduct)
router.post("/product-details",getProductDetails)
router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post("/addtocart",authToken,addToCartController)
router.get("/countAddToCartProduct",authToken,countAddToCartProduct)
router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)
router.post("/delete-cart-product",authToken,deleteAddToCartProduct)


module.exports = router;
