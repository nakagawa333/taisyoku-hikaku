import Joi, { ObjectSchema } from "joi";

/**
 * 口コミ新規作成用バリデーションチェック
 * @param serviceId 
 * @returns 
 */
export default function createCommentValidate(
    serviceId: string | undefined,
    name: string | undefined,
    title: string | undefined,
    gender: string | undefined,
    priceSatisfactionRating: number | undefined, //価格の満足度の評価
    satisfactionWithSpeedRating: number | undefined,//スピードの満足度
    satisfactionWithResponseRating: number | undefined, //対応の満足度
    satisfactionWithCostPerformanceRating: number | undefined //コスパの満足度
) {
    const schema: ObjectSchema<any> = Joi.object({
        serviceId: Joi.string().required().messages({
            "any.required": "サービスIDは必須項目です。"
        }),
        name: Joi.string().required().messages({
            "any.required": "名前は必須項目です。"
        }),
        title: Joi.string().required().messages({
            "any.required": "タイトルは必須項目です。"
        }),
        gender: Joi.string().valid("MEN", "WOMEN").required().messages({
            "any.only": "性別は「男性」または「女性」のみを許可します。",
            "any.required": "性別は必須項目です。"
        }),
        priceSatisfactionRating: Joi.number().min(1).max(5).required().messages({
            "number.base": "価格の満足度の評価は数値のみ許可されています。",
            "number.min": "価格の満足度の評価は1以上5以下の数字のみ許可されています。",
            "number.max": "価格の満足度の評価は1以上5以下の数字のみ許可されています。",
            "any.required": "価格の満足度の評価は必須項目です。"
        }),
        satisfactionWithSpeedRating: Joi.number().min(1).max(5).required().messages({
            "number.base": "スピードの満足度の評価は数値のみ許可されています。",
            "number.min": "スピードの満足度の評価は1以上5以下の数字のみ許可されています。",
            "number.max": "スピードの満足度の評価は1以上5以下の数字のみ許可されています。",
            "any.required": "スピードの満足度の評価は必須項目です。"
        }),
        satisfactionWithResponseRating: Joi.number().min(1).max(5).required().messages({
            "number.base": "対応の満足度の評価は数値のみ許可されています。",
            "number.min": "対応の満足度の評価は1以上5以下の数字のみ許可されています。",
            "number.max": "対応の満足度の評価は1以上5以下の数字のみ許可されています。",
            "any.required": "対応の満足度の評価は必須項目です。"
        }),
        satisfactionWithCostPerformanceRating: Joi.number().min(1).max(5).required().messages({
            "number.base": "コスパの満足度の評価は数値のみ許可されています。",
            "number.min": "コスパの満足度の評価は1以上5以下の数字のみ許可されています。",
            "number.max": "コスパの満足度の評価は1以上5以下の数字のみ許可されています。",
            "any.required": "コスパの満足度の評価は必須項目です。"
        }),

    });

    const { error } = schema.validate({
        serviceId: serviceId, name: name, title: title,
        gender: gender, priceSatisfactionRating: priceSatisfactionRating, satisfactionWithSpeedRating: satisfactionWithSpeedRating,
        satisfactionWithResponseRating: satisfactionWithResponseRating, satisfactionWithCostPerformanceRating: satisfactionWithCostPerformanceRating
    });
    return error;
}