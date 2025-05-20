import { Card } from "./Card.js"

export class PlayerCard extends Card {

    constructor(name, symbolsLeft, symbolsRight, effect){
        super(name)
        this.symbolsLeft = symbolsLeft
        this.symbolsRight = symbolsRight
        this.effect = effect
    }

    setDamage(damage) {
        this.damage = damage
    }

    toString = () => {
        return "\n" + this.name + "\n" +
            "L: " + symbolsPrint(this.symbolsLeft) + "\n" +
            "R: " + symbolsPrint(this.symbolsRight) +
            this.effect.toString() + "\n" +
            damagePrint(this.damage)
    }

}

function damagePrint(damage) {
    if (damage != null) {
        return "Danno: " + damage
    }
    else return ""
}

function symbolsPrint(symbols) {
    let string = ""
    symbols.forEach((s) => {
        string += s.tipo
        string += " "
    })
    return string
}