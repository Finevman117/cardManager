import {test} from "node:test"

import { ComboSymbol, comboSymbolSort } from "../objects/ComboSymbols.js"
import { creaCondizioneSingola, ConditionType, creaCondizioneLibera } from "../objects/Condition.js"
import { Effect } from "../objects/Effect.js"
import { Area, EffettoCura, EffettoLibero, Target } from "../objects/EffectType.js"
import { PlayerCard } from "../objects/PlayerCard.js"
import { assert } from "console"

test('pozione', (t) => {
    assert("Pozione" == testPozione().name)
})

test("fendente sfoderante", (t) => {
    assert("Fendente Sfoderante" == testFendenteSfoderante().name)
})

export function testFendenteSfoderante() {
    let symbolsLeft = new Array(ComboSymbol.STELLA_BIANCA).sort((a, b) => comboSymbolSort(a, b))
    let symbolsRight = new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.TRIANGOLO_ROSSO)
    let condizione = creaCondizioneSingola(ConditionType.DOPPIO, ComboSymbol.ROMBO_GIALLO)
    let effect = new Effect(condizione, new EffettoLibero("Rampino"))

    let fendenteS = new PlayerCard("Fendente Sfoderante", symbolsLeft, symbolsRight, effect)
    fendenteS.setDamage(2)

    console.log(fendenteS)
    console.log(fendenteS.toString())
    return fendenteS
}

export function testPozione() {
    let symbolsLeft = new Array(ComboSymbol.CERCHIO_VERDE).sort((a, b) => comboSymbolSort(a, b))
    let symbolsRight = new Array(ComboSymbol.EMPTY)
    let condizione = creaCondizioneLibera()
    let effect = new Effect(condizione, new EffettoCura(3, Area.NO_AREA, Target.SELF))

    let pozione = new PlayerCard("Pozione", symbolsLeft, symbolsRight, effect)

    console.log(pozione)
    console.log(pozione.toString())
    return pozione
}