import shuffle from "@/utils/shuffle";

export default function generatePole(size) {
    //надо чтобы 2 одинаковых числа записывались в подряд
    let pole = []
    for (let i = 0; i < size / 2; i++) {
        pole.push(i)
        pole.push(i)
    }

    return shuffle(pole)
}

