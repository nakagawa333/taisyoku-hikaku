import { HttpStatus } from "@/constants/common/httpStatus";
import contactInformationsValidate from "@/utils/api/validate/contactInformationsValidate";
import axios, { AxiosRequestConfig } from "axios";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/contactInformations:
 *   get:
 *     summary: お問い合わせ送信API
 *     description: お問い合わせの送信を行う
 *     parameters:
 *      - in: query
 *        name: mail
 *        schema:
 *           type: string
 *        required: true
 *        description: メールアドレス
 *      - in: query
 *        name: inquiryDetails
 *        schema:
 *           type: string
 *        required: true
 *        description: お問い合わせ内容      
 *     responses:
 *       200:
 *         description: 成功時のレスポンス
 *　　　 400:
           description: バリデーションチェックエラー時のレスポンス
 * 　　　500:
 *         description: 退職代行サービス取得失敗時のレスポンス
 */
export async function POST(request: NextRequest) {
    const headers = new Headers(request.headers);
    const authorization = headers.get("Authorization");
    const token = authorization?.replace("Bearer ", "");

    const verifyURL: string = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

    try {
        const body = {
            secret: process.env.TURNSTILE_SECRET_KEY,
            response: token,
        }
        const res = await axios.post(verifyURL, body);

        if (!res?.data.success) {
            return NextResponse.json(
                { "msg": "認証に失敗しました" },
                { status: HttpStatus.FORBIDDEN }
            );
        }

    } catch (err: any) {
        console.error('Turnstile検証エラー:', err)
        return NextResponse.json(
            { error: '認証処理に失敗しました' },
            { status: HttpStatus.INTERNAL_SERVER_ERROR }
        )
    }

    let json: any = {};

    try {
        json = await request.json();
    } catch (err: any) {
        return NextResponse.json(
            { error: '不正なJSON形式です' },
            { status: HttpStatus.BAD_REQUEST }
        )
    }

    const mail = json.mail;
    const inquiryDetails = json.inquiryDetails;

    let validateError = contactInformationsValidate(mail, inquiryDetails);
    if (validateError) {
        return NextResponse.json({ "msg": validateError.details[0].message }, { status: 400 });
    }

    const googleFormrReqUrl: string = `https://docs.google.com/forms/u/0/d/e/${process.env.GOOGLE_FORM_ID}/formResponse`;

    const formData = new FormData();
    formData.append("entry.1195360438", json.mail);
    formData.append("entry.1402385736", json.inquiryDetails);

    const axiosRequestConfig: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    //Google Formに入力内容を送信する
    try {
        axios.post(googleFormrReqUrl, formData, axiosRequestConfig);
    } catch (err: any) {
        console.error('GoogleFormの送信に失敗しました:', err)
        return NextResponse.json(
            { error: 'GoogleFormの送信に失敗しました' },
            { status: HttpStatus.BAD_REQUEST }
        )
    }

    return NextResponse.json(
        { status: HttpStatus.NO_CONTENT }
    )
}