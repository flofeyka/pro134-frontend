/**
 * Форматирует строкуW
 * ------------------
 * Заполняет определенными символами строку для опрелеленной длины
 *
 * @param income
 * @param length
 * @param fillChar
 */
export const fillMaskString = (income: string, length: number, fillChar: string) => {
    let masked = ''

    for (let i = 0; i < length - income.length; i++) {
        masked += fillChar
    }

    return masked + income
}