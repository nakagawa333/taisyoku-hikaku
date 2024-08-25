/**
 * 日付をYYYY/MM/DD形式に変換する
 * @param date 変換する日付オブジェクト
 * @returns 変換された日付文字列(YYYY/MM/DD)
 */
export function formatDateToYMD(date: Date): string {
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // 月は0から始まるので+1
    const day: string = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}