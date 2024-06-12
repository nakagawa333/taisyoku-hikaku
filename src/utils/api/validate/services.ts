import RegexConstants from "@/constants/common/regexConstants";
import Joi, { ObjectSchema } from "joi";

/**
 * 退職代行サービス一覧取得 バリデーションチェック
 */

export default function validate(minPrice:number,maxPrice:number){
    const schema:ObjectSchema<any> = Joi.object({
        minPrice:Joi.number().max(maxPrice),
        maxPrice:Joi.number().min(minPrice)
    });

    const { error } = schema.validate({ minPrice: minPrice,maxPrice:maxPrice});
    return error
}