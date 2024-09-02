/**
 * 退職代行サービス 口コミメタデータ取得 バリデーションチェック
 */

import Joi, { ObjectSchema } from "joi";

export default function validate(serviceId: string | null) {
    const schema: ObjectSchema<any> = Joi.object({
        serviceId: Joi.string().required()
    });

    const { error } = schema.validate({ serviceId: serviceId });
    return error;
}