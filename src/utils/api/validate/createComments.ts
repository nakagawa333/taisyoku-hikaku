import Joi, { ObjectSchema } from "joi";

/**
 * 口コミ新規作成用バリデーションチェック
 * @param serviceId 
 * @returns 
 */
export default function createCommentValidate(
    serviceId: string | undefined,
    name: string | undefined,
    review: string | undefined,
    rating: number | undefined,
    title: string | undefined,
    gender: string | undefined
) {
    const schema: ObjectSchema<any> = Joi.object({
        serviceId: Joi.string().required().messages({
            "any.required": "サービスIDは必須項目です。"
        }),
        name: Joi.string().required().messages({
            "any.required": "名前は必須項目です。"
        }),
        review: Joi.string().required().messages({
            "any.required": "レビューは必須項目です。"
        }),
        rating: Joi.number().min(1).max(5).required().messages({
            "number.base": "評価は数値のみ許可されています。",
            "number.min": "評価は1以上5以下の数字のみ許可されています。",
            "number.max": "評価は1以上5以下の数字のみ許可されています。",
            "any.required": "評価は必須項目です。"
        }),
        title: Joi.string().required().messages({
            "any.required": "タイトルは必須項目です。"
        }),
        gender: Joi.string().valid("MEN", "WOMEN").required().messages({
            "any.only": "性別は「男性」または「女性」のみを許可します。",
            "any.required": "性別は必須項目です。"
        })
    });

    const { error } = schema.validate({ serviceId: serviceId, name: name, review: review, rating: rating, title: title, gender: gender });
    return error;
}