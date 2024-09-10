/**
 * 口コミの評価取得 バリデーションチェック
 */

import Joi, { ObjectSchema } from "joi";

export default function percentageByRatingValidate(serviceId: string | null) {
    const schema: ObjectSchema<any> = Joi.object({
        serviceId: Joi.string().uuid().required()
    });

    const { error } = schema.validate({ serviceId: serviceId });
    return error;
}