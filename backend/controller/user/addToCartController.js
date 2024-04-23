const addToCartModel = require("../../models/cartProduct");

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body;
        const currentUser = req.userId;

        // Validate productId
        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                success: false,
                error: true
            });
        }

        // Check if user is authenticated
        if (!currentUser) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
                error: true
            });
        }

        const isProductAvailable = await addToCartModel.findOne({ productId });

        console.log("isProductAvailable", isProductAvailable);

        if (isProductAvailable) {
            return res.json({
                message: "Product already exists in the cart",
                success: false,
                error: true
            });
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        };

        const newAddToCart = new addToCartModel(payload);
        const saveProduct = await newAddToCart.save();

        return res.json({
            data: saveProduct,
            message: "Product added to the cart",
            success: true,
            error: false
        });
    } catch (err) {
        console.error("Error in addToCartController:", err);
        return res.status(500).json({
            message: err?.message || "Internal server error",
            error: true,
            success: false
        });
    }
};

module.exports = addToCartController;
