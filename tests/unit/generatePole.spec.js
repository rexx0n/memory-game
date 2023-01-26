import generatePole from "@/utils/generatePole";

describe('generatePole function', () => {
    test('функция возвращает массив заданого размера', () => {
        expect(generatePole(6)).toHaveLength(6)
    })
    test('функция возвращает только числа', () => {
        expect(generatePole(4)).toContain(1)
    })
})
