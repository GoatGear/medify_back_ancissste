import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import testModel from '../../models/v1/test.model.js';

const testAuth = asyncMiddleware(async (req, res) => {
    res.status(200).json({ message: 'Test Admin Route' });
}
);

const emailTest = asyncMiddleware(async (req, res) => {
    // Enviar correo de prueba
    res.json(await testModel.testCorreo(req.body));
}
);

export default {
    testAuth,
    emailTest
};