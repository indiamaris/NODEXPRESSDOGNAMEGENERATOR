/** @format */

module.exports = function (req, res, next) {
	// console.debug(req.User);
	if (!req.User.isAdmin) return res.status(403).send('Forbiden');
	
	next();
};



