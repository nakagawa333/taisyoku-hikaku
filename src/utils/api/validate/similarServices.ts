import Joi, { ObjectSchema } from "joi";

/**
 * 類似退職代行サービス取得API バリデーションチェック
 * @param serviceId サービスID
 * @returns エラーフラグ
 */
export default function validate(serviceId:string | null){
    const schema:ObjectSchema<any> = Joi.object({
        serviceId:Joi.string().required()
    });

    const { error } = schema.validate({ serviceId: serviceId});
    return error;
}