import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import profileModel from '../../models/v1/profile.model.js'

const adminProfile = (req, res) => {
    res.json({ message: 'AdminProfile route' })
}

const getProfileById = asyncMiddleware(async (req, res) => {
    res.json(await profileModel.getProfileById(req.body));
});

const profileController = {
    adminProfile,
    getProfileById,
};

export default profileController;