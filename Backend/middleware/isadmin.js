const isadmin = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(authHeader); // Note: 'authorization' in lowercase
    
    if (!authHeader) {
        return res.status(403).json({ message: "Authorization header is required" });
    }
    console.log('Hello', authHeader);
    
    const token = authHeader.split(' ')[1]; // Extract token after 'Bearer'
    console.log(token); // Extracted token
    console.log("Token extracted:", token);
    
    if (!token) {
        return res.status(403).json({ message: "Token is missing from the authorization header" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id; // Extract user ID from the decoded token
        
        const user = await User.findById(userId); // Fetch user from the database
        console.log(user);
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user has an 'admin' role
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied, only admin can access" });
        }

        req.user = user; // Attach the entire user object to the request
        req.username = user.name;  // Assuming 'name' is the username field
        
        next(); // Proceed to next middleware or route handler
    } catch (e) {
        return res.status(403).json({ message: "Unauthorized, invalid or expired token" });
    }
}
module.exports=isadmin;