async function userLogout(req, res) {
    try {
        // Clear the token cookie
        res.clearCookie("token", { httpOnly: true, secure: true })

        res.json({
            message: "Logout successful",
            error: false,
            success: true,
            data: []
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false,
        });
    }
}

module.exports = userLogout