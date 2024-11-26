import Joi, { ObjectSchema } from "joi";

/**
 * 口コミ新規作成用バリデーションチェック
 * @param serviceId 
 * @returns 
 */
export default function createReviewsValidate(
    serviceId: string | undefined, //サービスID
    name: string | undefined, //ニックネーム
    gender: string | undefined, //性別
    goodTitle: string | undefined, //良い点
    concernTitle: string | undefined, //悪い点
    priceSatisfaction: number | undefined, //価格の満足度の評価
    speedSatisfaction: number | undefined,//スピードの満足度
    responseSatisfaction: number | undefined, //対応の満足度
    costPerformanceSatisfaction: number | undefined, //コスパの満足度
    comprehensiveEvaluation: number | undefined //総合評価
) {
    const schema: ObjectSchema<any> = Joi.object({
        serviceId: Joi.string().required().messages({
            "any.required": "サービスIDは必須項目です。"
        }),
        name: Joi.string().required().messages({
            "any.required": "名前は必須項目です。"
        }),
        gender: Joi.string().valid("MEN", "WOMEN").required().messages({
            "any.only": "性別は「男性」または「女性」のみを許可します。",
            "any.required": "性別は必須項目です。"
        }),
        goodTitle: Joi.string().required().messages({
            "any.required": "良い点は必須項目です。"
        }),
        concernTitle: Joi.string().required().messages({
            "any.required": "は必須項目です。"
        }),
        priceSatisfaction: Joi.number().min(1).max(5).required().messages({
            "number.base": "価格の満足度の評価は数値のみ許可されています。",
            "number.min": "価格の満足度の評価は1以上5以下の数字のみ許可されています。",
            "number.max": "価格の満足度の評価は1以上5以下の数字のみ許可されています。",
            "any.required": "価格の満足度の評価は必須項目です。"
        }),
        speedSatisfaction: Joi.number().min(1).max(5).required().messages({
            "number.base": "スピードの満足度の評価は数値のみ許可されています。",
            "number.min": "スピードの満足度の評価は1以上5以下の数字のみ許可されています。",
            "number.max": "スピードの満足度の評価は1以上5以下の数字のみ許可されています。",
            "any.required": "スピードの満足度の評価は必須項目です。"
        }),
        responseSatisfaction: Joi.number().min(1).max(5).required().messages({
            "number.base": "対応の満足度の評価は数値のみ許可されています。",
            "number.min": "対応の満足度の評価は1以上5以下の数字のみ許可されています。",
            "number.max": "対応の満足度の評価は1以上5以下の数字のみ許可されています。",
            "any.required": "対応の満足度の評価は必須項目です。"
        }),
        costPerformanceSatisfaction: Joi.number().min(1).max(5).required().messages({
            "number.base": "コスパの満足度の評価は数値のみ許可されています。",
            "number.min": "コスパの満足度の評価は1以上5以下の数字のみ許可されています。",
            "number.max": "コスパの満足度の評価は1以上5以下の数字のみ許可されています。",
            "any.required": "コスパの満足度の評価は必須項目です。"
        }),
        comprehensiveEvaluation: Joi.number().min(1).max(5).required().messages({
            "number.base": "コスパの満足度の評価は数値のみ許可されています。",
            "number.min": "コスパの満足度の評価は1以上5以下の数字のみ許可されています。",
            "number.max": "コスパの満足度の評価は1以上5以下の数字のみ許可されています。",
            "any.required": "コスパの満足度の評価は必須項目です。"
        }),
    });

    const { error } = schema.validate({
        serviceId: serviceId, name: name,
        goodTitle: goodTitle, concernTitle: concernTitle,
        gender: gender, priceSatisfaction: priceSatisfaction, speedSatisfaction: speedSatisfaction,
        responseSatisfaction: responseSatisfaction, costPerformanceSatisfaction: costPerformanceSatisfaction,
        comprehensiveEvaluation: comprehensiveEvaluation
    });
    return error;
}