import Joi, { ObjectSchema } from "joi";

/**
 * 口コミ削除用バリデーションチェック
 * @param reviewId レビューID
 * @returns 
 */
export default function deleteReviewsValidate(reviewId: string | undefined) {
    const schema: ObjectSchema<any> = Joi.object({
        reviewId: Joi.string().required().messages({
            "any.required": "レビューIDは必須項目です。"
        }),
    });
    const { error } = schema.validate({
        reviewId: reviewId
    });
    return error;
}