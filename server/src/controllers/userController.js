const User = require('../models/User');

const profileController = async(req, res) => {

    //It means fetch the user, but don't include the password field
    const user = await User.findById(req.user.id).select('-password');

    res.status(200).json({
        success : true,
        user
    });
};

module.exports = { profileController };