import Joi, { ObjectSchema } from "joi";

/**
 * 
 * @param mail メールアドレス
 * @param inquiryDetails お問い合わせ内容
 */
export default function contactInformationsValidate(
    mail: string, inquiryDetails: string) {
    const schema: ObjectSchema<any> = Joi.object({
        mail: Joi.string().email().required(),
        inquiryDetails: Joi.string().required()
    });

    const { error } = schema.validate({ mail: mail, inquiryDetails: inquiryDetails });
    return error;
}