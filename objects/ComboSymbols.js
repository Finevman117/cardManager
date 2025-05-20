import { Enumify } from "enumify"

class ComboSymbol extends Enumify {
    static ROMBO_GIALLO = new ComboSymbol(false, 1, "giallo")
    static TRIANGOLO_ROSSO = new ComboSymbol(false, 2, "rosso")
    static QUADRATO_BLU = new ComboSymbol(false, 3, "blu")
    static CERCHIO_VERDE = new ComboSymbol(false, 4, "verde")
    static STELLA_BIANCA = new ComboSymbol(true, 0, "bianco")
    static EMPTY = new ComboSymbol(false, 0, "vuoto")
    static _ = this.closeEnum;

    constructor(isJolly, place, tipo) {
        super()
        this.place = place
        this.tipo = tipo
        this.isJolly = isJolly
    }
}

function getStellaBianca() {
    return new Array(ComboSymbol.STELLA_BIANCA)
}

function getSimboliComboVuoto() {
    return new Array(ComboSymbol.EMPTY)
}

function comboSymbolSort(a, b) {
    return a.place - b.place
}


export {ComboSymbol, comboSymbolSort, getStellaBianca, getSimboliComboVuoto}