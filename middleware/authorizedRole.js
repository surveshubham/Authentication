const authRole = (roles) => {
    return (req, res, next) => {
        try {
            if (!req.user || !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Sorry you are not allowed to access this page' });
            }
            next();
        } catch (err) {
            return res.status(500).json({ message: 'An error occurred while checking roles' });
        }
    };
};

module.exports = authRole;
