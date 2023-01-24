export default function shuffle(pole) {
    return pole.sort(() => Math.random() - 0.5);
}