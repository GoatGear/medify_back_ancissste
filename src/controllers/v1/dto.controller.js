import { asyncMiddleware } from '../../middlewares/async.middleware.js'
import dtoModel from '../../models/v1/dto.model.js'

const adminDtos = (req, res) => {
    res.json({ message: 'Amin dtos route' })
}

const userDtos = asyncMiddleware(async (req, res) => {
    const userId = req.params.id;
    res.json(await dtoModel.getUserDto(userId));
})


const dtoController = {
    adminDtos,
    userDtos
};

export default dtoController;