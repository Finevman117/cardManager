import { ComboSymbol, comboSymbolSort, getSimboliComboVuoto, getStellaBianca } from "../../objects/ComboSymbols.js";
import { ConditionType, creaCondizioneDoppia, creaCondizioneLibera, creaCondizioneSingola } from "../../objects/Condition.js";
import { Effect } from "../../objects/Effect.js";
import { Area, EffettoDanno, EffettoDannoParte, EffettoLibero, EffettoParata, EffettoRecupero, EffettoStun, EffettoRiprendi, Target, EffettoSpostamentoLibero, EffettoMovimento, EffettoGiocaImmediatamente } from "../../objects/EffectType.js";
import { PlayerCard } from "../../objects/PlayerCard.js";
import { writeTierToFile } from "../JSONhelper.js";

const weaponName = "gunlance"

function populateBaseTier() {
    const parata = new PlayerCard("Parata", 
        getStellaBianca(),
        new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.TRIANGOLO_ROSSO, ComboSymbol.CERCHIO_VERDE),
        new Array(new Effect(creaCondizioneLibera(), new EffettoParata(Area.NO_AREA, Target.SELF)),
            new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.ROMBO_GIALLO), new EffettoRecupero(2, Area.NO_AREA, Target.SELF)),
            new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.TRIANGOLO_ROSSO), new EffettoGiocaImmediatamente("Sparo"))))
    
    let cannoneWyverTmp = new PlayerCard("Cannone Wyver",
        new Array(ComboSymbol.TRIANGOLO_ROSSO, ComboSymbol.QUADRATO_BLU),
        getSimboliComboVuoto(),
        new Array(new Effect(creaCondizioneLibera(), new EffettoDannoParte(2, Area.NO_AREA)),
            new Effect(creaCondizioneSingola(ConditionType.CUMULATIVO, ComboSymbol.TRIANGOLO_ROSSO), new EffettoDanno("X", Area.NO_AREA)),
            new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.QUADRATO_BLU), new EffettoStun(1))))
    cannoneWyverTmp.setDamage(2)
    const cannoneWyver = cannoneWyverTmp

    let sparoTmp = new PlayerCard("Sparo",
        getStellaBianca(),
        new Array(ComboSymbol.ROMBO_GIALLO),
        new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.TRIANGOLO_ROSSO), 
            new Array(new EffettoDanno(1, Area.NO_AREA), new EffettoDannoParte(1, Area.NO_AREA))))
    sparoTmp.setDamage(1)
    const sparo = sparoTmp

    const ricarica = new PlayerCard("Ricarica",
        getStellaBianca(),
        new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.QUADRATO_BLU, ComboSymbol.CERCHIO_VERDE),
        new Array(new Effect(creaCondizioneLibera(), new EffettoRiprendi("Sparo")),
            new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.TRIANGOLO_ROSSO), new EffettoRiprendi("Cannone Wyver")),
            new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.QUADRATO_BLU), new EffettoRiprendi("Sparo"))))

    const baseTier = new Array(parata, cannoneWyver, sparo, sparo, ricarica)
    writeTierToFile(weaponName, "BaseTier.json", baseTier)
    console.log(baseTier.toString())
}

function populateTierI() {
    let affondoTmp = new PlayerCard("Affondo",
        new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.TRIANGOLO_ROSSO),
        new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.QUADRATO_BLU),
        new Effect(creaCondizioneLibera(), new EffettoLibero("Se la prossima carta che giochi e' uno 'Sparo', puoi colpire una parte qualsiasi")))
    affondoTmp.setDamage(1)
    const affondo = affondoTmp

    const slancioEsplosivo = new PlayerCard("Slancio Esplosivo",
        new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.TRIANGOLO_ROSSO),
        getSimboliComboVuoto(),
        new Array(new Effect(creaCondizioneLibera(), new EffettoSpostamentoLibero()),
            new Effect(creaCondizioneDoppia(ConditionType.ATTUALE, ComboSymbol.ROMBO_GIALLO, ComboSymbol.TRIANGOLO_ROSSO), 
                new EffettoDanno(3, Area.NO_AREA))))

    const ricaricaRapida = new PlayerCard("Ricarica Rapida",
        getStellaBianca(),
        new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.QUADRATO_BLU),
        new Effect(creaCondizioneLibera(), new EffettoRiprendi("Sparo")))

    const copertura = new PlayerCard("Copertura",
        new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.QUADRATO_BLU),
        new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.TRIANGOLO_ROSSO),
        new Array(new Effect(creaCondizioneLibera(), new EffettoParata(Area.NO_AREA, Target.SELF)),
            new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.ROMBO_GIALLO), 
                new EffettoMovimento(2, null, Area.ZONA, Target.SINGLE_TARGET)),
            new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.QUADRATO_BLU),
                new EffettoParata(Area.ZONA, Target.SINGLE_TARGET))))

    let schiantoTmp = new PlayerCard("Schianto",
        new Array(ComboSymbol.TRIANGOLO_ROSSO, ComboSymbol.QUADRATO_BLU),
        new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.TRIANGOLO_ROSSO),
        new Array(new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.TRIANGOLO_ROSSO), 
                new EffettoGiocaImmediatamente("Sparo")),
            new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.QUADRATO_BLU),
                new EffettoGiocaImmediatamente("Sparo"))))
    schiantoTmp.setDamage(2)
    const schianto = schiantoTmp

    const passo = new PlayerCard("Passo",
        new Array(ComboSymbol.ROMBO_GIALLO, ComboSymbol.QUADRATO_BLU),
        new Array(ComboSymbol.QUADRATO_BLU, ComboSymbol.CERCHIO_VERDE),
        new Array(new Effect(creaCondizioneLibera(), new EffettoMovimento(1, null, Area.NO_AREA, Target.SELF)),
            new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.ROMBO_GIALLO), new EffettoMovimento(2, null, Area.NO_AREA, Target.SELF)),
            new Effect(creaCondizioneSingola(ConditionType.ATTUALE, ComboSymbol.QUADRATO_BLU), new EffettoRecupero(1, Area.NO_AREA, Target.SELF))))

    let montanteTmp = new PlayerCard("Montante",
        new Array(ComboSymbol.TRIANGOLO_ROSSO),
        new Array(ComboSymbol.TRIANGOLO_ROSSO, ComboSymbol.QUADRATO_BLU),
        new Effect(creaCondizioneLibera(), new EffettoStun(1)))
    montanteTmp.setDamage(1)
    const montante = montanteTmp

    let fendenteLateraleTmp = new PlayerCard("Fendente Laterale",
        new Array(ComboSymbol.ROMBO_GIALLO),
        new Array(ComboSymbol.TRIANGOLO_ROSSO, ComboSymbol.QUADRATO_BLU),
        new Effect(creaCondizioneSingola(ConditionType.DOPPIO, ComboSymbol.TRIANGOLO_ROSSO), new EffettoDannoParte(1, Area.NO_AREA)))
    fendenteLateraleTmp.setDamage(1)
    const fendenteLaterale = fendenteLateraleTmp
    
    const tier1 = new Array(affondo, slancioEsplosivo, ricaricaRapida, copertura, schianto, passo, montante, fendenteLaterale)
    writeTierToFile(weaponName, "TierI.json", tier1)
    console.log(tier1.toString())
}

populateBaseTier()
populateTierI()