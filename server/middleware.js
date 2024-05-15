export const loggedIn = (req, res, next) => {   
    if (req.session.email) {
        next();
    } else {
        res.json(false);
    }
};