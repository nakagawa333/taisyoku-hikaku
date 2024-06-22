
/**
 * 配列から二重配列を作成する
 * @param arr 配列
 * @param num 分割数字
 */
export function createNestedArrays(arr:any[],num:number){
    const ceil = Math.ceil(arr.length / num);
    const nestedArrays:any[][] = [];

    for(let i = 0; i < ceil; i++){
        nestedArrays.push(arr.slice(i * num,i * num + num));
    }

    return nestedArrays;
}