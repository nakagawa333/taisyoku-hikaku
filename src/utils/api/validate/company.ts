import Joi, { ObjectSchema } from "joi";

/**
 * 退職代行サービス取得 バリデーションチェック
 */

export default function validate(serviceId:string | null){
    const schema:ObjectSchema<any> = Joi.object({
        serviceId:Joi.string().required()
    });

    const { error } = schema.validate({ serviceId: serviceId});
    return error;
}