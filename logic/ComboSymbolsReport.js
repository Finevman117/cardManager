
class ComboSymbolCount {
    setYellowCount(count) {
        this.yellowCount = count
    }

    setRedCount(count) {
        this.redCount = count
    }

    setBlueCount(count) {
        this.blueCount = count
    }

    setGreenCount(count) {
        this.greenCount = count
    }

    setWhiteCount(count) {
        this.whiteCount = count
    }

    setEmptyCount(count) {
        this.emptyCount = count
    }
}

export function computeComboSymbolCount(symbols) {
    let count = new ComboSymbolCount()

    count.setYellowCount(symbols.filter((s) => {
        return s.includes('giallo')}).length)
    count.setRedCount(symbols.filter((s) => {
        return s.includes('rosso')}).length)
    count.setBlueCount(symbols.filter((s) => {
        return s.includes('blu')}).length)
    count.setGreenCount(symbols.filter((s) => {
        return s.includes('verde')}).length)
    count.setWhiteCount(symbols.filter((s) => {
        return s.includes('bianco')}).length)
    count.setEmptyCount(symbols.filter((s) => {
        return s.includes('vuoto')}).length)

    return count
}

export class ComboSymbolReport {
    constructor(side) {
        this.side = side
    }

    computeSymbolReport(symbolsArray) {
        this.symbolsArray = symbolsArray
            
        this.symbolsCount = computeComboSymbolCount(this.symbolsArray.map((e) => e.symbols))
    }
}

export class SymbolsArray {
    constructor(cardName, symbols) {
        this.cardName = cardName
        this.symbols = symbols
    }
}