import Joi, { ObjectSchema } from "joi";

/**
 * 送信されたお問い合わせ内容のバリデーションチェックを行う
 * @param mail メールアドレス
 * @param inquiryDetails お問い合わせ内容
 */
export default function contactInformationsValidate(
    mail: any, inquiryDetails: any) {
    const schema: ObjectSchema<any> = Joi.object({
        mail: Joi.string().email().required(),
        inquiryDetails: Joi.string().required()
    });

    const { error } = schema.validate({ mail: mail, inquiryDetails: inquiryDetails });
    return error;
}