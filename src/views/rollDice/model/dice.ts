import { KindDice } from './kind-dice';

export class Dice {
    kind: KindDice;
    valueMax: number;
    label: string;

    constructor(kind: KindDice, valueMax: number, label: string) {
        this.kind = kind;
        this.valueMax = valueMax;
        this.label = label;
    }
}
