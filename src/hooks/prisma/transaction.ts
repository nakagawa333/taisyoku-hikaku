import prisma from "@/libs/prisma/prismaClient";

/**
 * トランザクション処理
 * @param funcs 実施する関数群
 */
export async function transaction(...funcs: any) {
    return await prisma.$transaction(async (prisma: any) => {
        for (let func of funcs) {
            try {
                const res = await func;
                if (!res) {
                    throw new Error('作成・更新処理に失敗');
                }
            } catch (error: any) {
                throw new Error(`トランザクション失敗: ${error.message}`);
            }
        }
    });
}