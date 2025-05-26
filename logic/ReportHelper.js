import { writeToFile, readFromFile } from "../cards/JSONhelper.js";
import { IntraTierMatches } from "./TierMatches.js";
import { ComboSymbolReport, computeComboSymbolCount, SymbolsArray } from "./ComboSymbolsReport.js";

export class Report {
    constructor(name, cardData) {
        this.name = name
        this.cardData = cardData
    }

    getWeaponReport() {
        if (this.cardData instanceof WeaponCardData) {
            
        }
        else throw new Error("Wrong cardDataType")
    }

    getMonsterReport() {
        if (this.cardData instanceof MonsterCardData) {
            throw new Error("Not yet implemented")
        }
        else throw new Error("Wrong cardDataType")
    }
}

class WeaponCardData {
    constructor(weapon, tier) {
        this.weapon = weapon
        this.tier = tier
    }

    setCardNumber(cardNum) {
        this.cardNum = cardNum
    }

    setCardNames(cardNames) {
        this.cardNames = cardNames
    }

    computeDamageAvg(damages) {
        this.damages = damages
        this.damageAverage = damages.reduce((a, b) => a + b, 0)/this.cardNum
    }

    setComboSymbolReportRight(report) {
        this.comboSymbolReportRight = report
    }

    setComboSymbolReportLeft(report) {
        this.comboSymbolReportLeft = report
    }

    computeTierMatches() {
        let tierMatches = new IntraTierMatches(this.cardNames)
        tierMatches.computeTierMatches(this.comboSymbolReportLeft, this.comboSymbolReportRight)
        tierMatches.computeTierMatchesStats(this.comboSymbolReportLeft.symbolsArray.length-1)
        this.tierMatches = tierMatches
    }
}

export function createWeaponDataReport(weapon, tier) {
    const cards = readFromFile(getWeaponPath(weapon, tier))

    let weaponCardData = new WeaponCardData(weapon, tier)
    weaponCardData.setCardNumber(cards.length)
    weaponCardData.setCardNames(cards.map((card) => {
        return card.name
    }))

    weaponCardData.computeDamageAvg(cards.map((card) => {
        if(card.damage != null)
            return card.damage
        else return 0
    }))

    let comboSymbolReportLeft = new ComboSymbolReport("left")
    comboSymbolReportLeft.computeSymbolReport(cards.map((card) => {
        return new SymbolsArray(card.name, card.symbolsLeft.map((side) => side.tipo))
    }))
    weaponCardData.setComboSymbolReportLeft(comboSymbolReportLeft)

    let comboSymbolReportRight = new ComboSymbolReport("right")
    comboSymbolReportRight.computeSymbolReport(cards.map((card) => {
        return new SymbolsArray(card.name, card.symbolsRight.map((side) => side.tipo))
    }))
    weaponCardData.setComboSymbolReportRight(comboSymbolReportRight)

    weaponCardData.computeTierMatches()

    writeToFile(getWeaponReportPath(weapon, tier), weaponCardData)
}

class MonsterCardData {

}

function getWeaponPath(weapon, tier) {
    return "./cards/"+weapon+"/"+tier+".json"
}

function getWeaponReportPath(weapon, tier) {
    return "logic/reports/"+weapon+"/"+tier+"Report.json"
}