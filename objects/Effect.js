export class Effect {
    constructor(condizione, effectType) {
        this.condizione = condizione
        this.effectType = effectType
    }

    toString = () => {
        return "\n" + this.condizione.toString() + " : " + this.effectType.toString()
    }
}

