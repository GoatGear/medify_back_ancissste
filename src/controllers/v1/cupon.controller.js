import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import cuponModel from '../../models/v1/cupon.model.js'

const adminCupones = (req, res) => {
    res.json({ message: 'AdminCupones route' })
}

const getCupones = asyncMiddleware(async (req, res) => {
    res.json(await cuponModel.getCupones(req.body, req.params));
});

const createCupon = asyncMiddleware(async (req, res) => {
    res.json(await cuponModel.createCupon(req.body));
}
);

const validateCupon = asyncMiddleware(async (req, res) => {
    res.json(await cuponModel.validateCupon(req.body));
}
);

const updateCupon = asyncMiddleware(async (req, res) => {
    res.json(await cuponModel.updateCupon(req.body));
}
);

const reservationController = {
    adminCupones,
    getCupones,
    createCupon,
    validateCupon,
    updateCupon
};

export default reservationController;