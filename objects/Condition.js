import { Enumify } from "enumify"

class ConditionType extends Enumify {
    static CUMULATIVO = new ConditionType("X")
    static ATTUALE = new ConditionType("!")
    static SINGOLO = new ConditionType("1")
    static DOPPIO = new ConditionType("2")
    static EMPTY = new ConditionType("0")
    static _ = this.closeEnum()

    constructor(condizione) {
        super()
        this.condizione = condizione
    }

    toString = () => {
        return " " + this.condizione + " "
    }
}

function creaCondizioneSingola(tipo, symbol) {
    let condizione = new Condition()
    condizione.setTipo(tipo)
    condizione.setCoppiaCombo(symbol)
    return condizione
}

function creaCondizioneDoppia(tipo, symbol1, symbol2) {
    let condizione = new Condition()
    condizione.setTipo(tipo)
    condizione.setDoppiaCoppiaCombo(symbol1, symbol2)
    return condizione
}

function creaCondizioneLibera() {
    let condizione = new Condition()
    condizione.setTipo(ConditionType.EMPTY)
    return condizione
}

function symbolPrint(symbol) {
    return "Coppia " + symbol.tipo
}

class Condition {
    
    setTipo(tipo) {
        this.condizione = tipo
    }

    setCoppiaCombo(symbol) {
        this.coppia1 = symbol
        this.coppiaSingola = true
    }

    getCoppiaCombo() {
        return symbolPrint(this.coppia1)
    }

    setDoppiaCoppiaCombo(symbol1, symbol2) {
        this.coppia1 = symbol1
        this.coppia2 = symbol2
        this.coppiaSingola = false
    }

    getDoppiaCoppiaCombo() {
        return symbolPrint(this.coppia1) + "&" + symbolPrint(this.coppia2)
    }

    toString = () => {
        if (this.condizione == ConditionType.EMPTY) {
            return "Free"
        }
        if (this.condizione == ConditionType.ATTUALE) {
            return (this.coppiaSingola ? this.getCoppiaCombo() : this.getDoppiaCoppiaCombo()) +
                this.condizione.toString()
        }
        if (this.condizione == ConditionType.CUMULATIVO ||
            this.condizione == ConditionType.SINGOLO ||
            this.condizione == ConditionType.DOPPIO) {
            return this.condizione.toString() +
                (this.coppiaSingola ? this.getCoppiaCombo() : this.getDoppiaCoppiaCombo())
        }
        
    }
}

export {ConditionType, creaCondizioneDoppia, creaCondizioneSingola, creaCondizioneLibera}