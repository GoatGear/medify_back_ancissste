import { ErrorInstance } from '../../config/error.config.js'
import Cupon from '../../schemas/cupon.schema.js'

const getCupones = async (body, params) => {
    try {
        const cupones = await Cupon.find({id: params._id}).populate('event')
        console.log(cupones)
        return cupones
    }
    catch (error) {
        throw error;
    }
}

const createCupon = async (data) => {
    try {
        console.log(data)
        const cuponFound = await Cupon.findOne({ codigo: data.codigo });
        if (cuponFound) {
            throw new ErrorInstance(400, 'El codigo ya existe');
        }
        const newCupon = new Cupon(data);
        await newCupon.save();
        return newCupon;
    }
    catch (error) {
        throw error;
    }
}

const validateCupon = async (data) => {
    try {
        const { codigo, eventId } = data;

        // 1. Buscar cupón
        const cuponFound = await Cupon.findOne({ codigo });

        if (!cuponFound) {
            throw new ErrorInstance(404, "Cupón no encontrado");
        }

        // 2. Validar si está habilitado
        if (!cuponFound.habilitado) {
            throw new ErrorInstance(400, "El cupón está deshabilitado");
        }

        // 3. Validar usos máximos
        if (cuponFound.usos_actuales >= cuponFound.usos_maximos) {
            throw new ErrorInstance(400, "El cupón ha alcanzado su límite de usos");
        }

        // 4. Validar evento si se envía eventId desde el front
        if (eventId && cuponFound.event.toString() !== eventId.toString()) {
            throw new ErrorInstance(400, "El cupón no es válido para este evento");
        }

        // 5. Si todo está bien → retornar cupón como válido
        return {
            valido: true,
            cupon: cuponFound,
            message: "Cupón válido"
        };
    } catch (error) {
        throw new ErrorInstance(400, "Error en cupón: " + error.statusCode);
    }
};

const updateCupon = async (data) => {
    try {
        const { id, codigo, event, usos_maximos, habilitado } = data;

        // 1. Verificar que el cupón exista
        const cuponFound = await Cupon.findById(id);
        if (!cuponFound) {
            throw new ErrorInstance(404, "Cupón no encontrado");
        }

        // 2. Validar si el nuevo código ya existe en otro cupón (si envían código nuevo)
        if (codigo && codigo !== cuponFound.codigo) {
            const codigoExistente = await Cupon.findOne({ codigo });
            if (codigoExistente) {
                throw new ErrorInstance(400, "Ya existe un cupón con ese código");
            }
        }

        // 3. Actualizar campos solo si fueron enviados
        if (codigo !== undefined) cuponFound.codigo = codigo;
        if (event !== undefined) cuponFound.event = event;
        if (usos_maximos !== undefined) cuponFound.usos_maximos = usos_maximos;
        if (habilitado !== undefined) cuponFound.habilitado = habilitado;

        // 4. Guardar cambios
        const cuponUpdated = await cuponFound.save();

        return {
            message: "Cupón actualizado correctamente",
            cupon: cuponUpdated
        };

    } catch (error) {
        throw error;
    }
};



const cuponModel = {
    getCupones,
    createCupon,
    validateCupon,
    updateCupon
}

export default cuponModel