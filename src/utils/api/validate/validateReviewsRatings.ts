import Joi, { ObjectSchema } from "joi";

export default function validateReviewsRatings(
    serviceId: string | undefined, //サービスID
    rating: number | undefined
) {
    const schema: ObjectSchema<any> = Joi.object({
        serviceId: Joi.string().required().messages({
            "any.required": "サービスIDは必須項目です。"
        }),
        rating: Joi.number().min(1).max(5).required().messages({
            "number.base": "評価の満足度の評価は数値のみ許可されています。",
            "number.min": "評価の満足度の評価は1以上5以下の数字のみ許可されています。",
            "number.max": "評価の満足度の評価は1以上5以下の数字のみ許可されています。",
            "any.required": "評価の満足度の評価は必須項目です。"
        }),
    });

    const { error } = schema.validate({ serviceId: serviceId, rating: rating });
    return error;
}