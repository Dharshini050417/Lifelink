const jwt = require('jsonwebtoken');

function checkAuthToken(req, res, next) {
    const authToken = req.cookies.authToken;
    const refreshToken = req.cookies.refreshToken;
    console.log("Received Auth Token:", authToken);
    console.log("Received Refresh Token:", refreshToken);

    if (!authToken || !refreshToken) {
        console.log("No tokens provided");
        return res.status(401).json({ message: 'Authentication failed: No authToken or refreshToken provided', ok: false });
    }

    jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("Auth Token verification failed:", err.message);
            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET_KEY, (refreshErr, refreshDecoded) => {
                if (refreshErr) {
                    console.error("Refresh Token verification failed:", refreshErr.message);
                    return res.status(401).json({ message: 'Authentication failed: Both tokens are invalid', ok: false });
                } else {
                    console.log("Refresh token is valid. Issuing new tokens...");
                    const newAuthToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
                    const newRefreshToken = jwt.sign({ userId: refreshDecoded.userId }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '60m' });

                    res.cookie('authToken', newAuthToken, { httpOnly: true });
                    res.cookie('refreshToken', newRefreshToken, { httpOnly: true });

                    req.userId = refreshDecoded.userId;
                    req.ok = true;
                    console.log("New User ID:", req.userId);
                    next();
                }
            });
        } else {
            console.log("Auth token is valid. User ID:", decoded.userId);
            req.userId = decoded.userId;
            next();
        }
    });
}

module.exports = checkAuthToken;
