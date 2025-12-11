import { ErrorInstance } from '../../config/error.config.js'

const getProfileById = async (data) => {
    try {
        console.log(data, 'no hay data')
    }
    catch (error) {
        throw new ErrorInstance(500, 'Error obteniendo perfíl', error)
    }
}

const profileModel = {
    getProfileById,
}

export default profileModel