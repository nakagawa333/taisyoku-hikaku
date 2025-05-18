import Joi, { ObjectSchema } from "joi";

/**
 * マジックリンク送信のバリデーションチェックを行う
 * @param mail メールアドレス
 * @returns 
 */
export default function magicLinkValidate(
    mail: any) {
    const schema: ObjectSchema<any> = Joi.object({
        mail: Joi.string().email().required(),
    });

    const { error } = schema.validate({ mail: mail });
    return error;
}