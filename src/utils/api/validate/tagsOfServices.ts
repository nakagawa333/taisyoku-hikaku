import Joi, { ObjectSchema } from "joi";

/**
 * 類似退職代行サービス取得API バリデーションチェック
 * @param serviceId サービスID
 * @returns エラーフラグ
 */
export default function validate(tagName: string) {
    const schema: ObjectSchema<any> = Joi.object({
        tagName: Joi.string().required()
    });

    const { error } = schema.validate({ tagName: tagName });
    return error;
}