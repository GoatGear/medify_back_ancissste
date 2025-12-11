import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import authModel from '../../models/v1/auth.model.js'

const adminAuth = (req, res) => {
    res.json({ message: 'AdminAuth route' })
}

const register = asyncMiddleware(async (req, res) => {
    res.json(await authModel.createUser(req.body));
});

const login = asyncMiddleware(async (req, res) => {
    res.json(await authModel.login(req.body))
})

const forgotPassword = asyncMiddleware(async (req, res) => {
    res.json(await authModel.forgotPassword(req.body))
})

const resetPassword = asyncMiddleware(async (req, res) => {
    res.json(await authModel.resetPassword(req.body))
}
)

const getUsers = asyncMiddleware(async (req, res) => {
    res.json(await authModel.getAll(req.body))
})

const updateUser = asyncMiddleware(async (req, res) => {
    res.json(await authModel.putUser(req.body))
})

const deleteUser = asyncMiddleware(async (req, res) => {
    res.json(await authModel.delUser(req.params))
})

const authController = {
    adminAuth,
    register,
    login,
    forgotPassword,
    resetPassword,
    getUsers,
    updateUser,
    deleteUser
};

export default authController;