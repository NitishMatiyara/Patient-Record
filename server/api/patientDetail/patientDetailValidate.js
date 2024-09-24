import Joi from "joi";

class PatientDetailValidation {
    static addPatient = async (data) => {
        const schema = Joi.object().keys({
            case_no: Joi.number().required(),
            firstname: Joi.string().required().trim(true),
            lastname: Joi.string().required().trim(true),
            middlename: Joi.string().required().trim(true),
            age: Joi.number().min(1).max(100).required(),
            birthdate: Joi.string().required(),
            city: Joi.string().required(),
            mobile: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
            address: Joi.string().required().trim(true),
            civilstatus: Joi.string().valid('Married', 'Single').required(),
            gender: Joi.string().valid('Male', 'Female').required(),
            userId: Joi.string().required(),

        })
        const result = schema.validate(data)

        return result
    }

    static updatePatient = async (data) => {
        const schema = Joi.object().keys({
            case_no: Joi.number().required(),
            firstname: Joi.string().required().trim(true),
            lastname: Joi.string().required().trim(true),
            middlename: Joi.string().required().trim(true),
            age: Joi.number().min(1).max(100).required(),
            birthdate: Joi.string().required(),
            city: Joi.string().required(),
            mobile: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
            address: Joi.string().required().trim(true),
            civilstatus: Joi.string().valid('Married', 'Single').required(),
            gender: Joi.string().valid('Male', 'Female').required(),

        })
        const result = schema.validate(data)

        return result
    }
}

export default PatientDetailValidation
