export class IntraTierMatches {
    constructor(cardNames) {
        this.cardMatchesArray = cardNames.map((c) => new CardMatches(c))
    }

    computeTierMatches(comboSymbolReportLeft, comboSymbolReportRight) {
        this.cardMatchesArray.forEach((cardMatches) => {
            cardMatches.setRightSymbols(comboSymbolReportRight
                .symbolsArray.filter((card) => card.cardName == cardMatches.cardName)[0]
                .symbols)
            cardMatches.computeDirectMatches(comboSymbolReportLeft)
            cardMatches.compute1DepthMatches(comboSymbolReportRight, comboSymbolReportLeft)
        })
    }

    computeTierMatchesStats(numberOfCardsInTierM1) {
        let normalizationCoefficient = 1/(numberOfCardsInTierM1)
        //console.log("Normalization Coefficient: ", normalizationCoefficient)
        this.cardMatchesArray.forEach((cardMatches) => {
            //console.log("Inspected Card: ", cardMatches.cardName)
            let matchCoefficient = 1/(numberOfCardsInTierM1/cardMatches.matches.length)
            //console.log("Match Coefficient: ", matchCoefficient)
            let matchValue = 0
            cardMatches.matches.forEach((matches) => {
                matchValue += matches.matches1depth.length/(numberOfCardsInTierM1-1)
            })
            //console.log("Match Value: ", matchValue)
            let value = normalizationCoefficient*matchCoefficient*matchValue
            //console.log("Combo Potential as First: ", value)
            cardMatches.setComboPotentialAsFirst(value)
        })
    }
}

class CardMatches {
    constructor(cardName) {
        this.cardName = cardName
    }

    setRightSymbols(symbols){
        this.symbolsRight = symbols
    }

    computeDirectMatches(comboSymbolReportLeft) {
        let matches = new Array()
        comboSymbolReportLeft.symbolsArray.forEach((card) => {
            if (!isSameCard(this.cardName, card.cardName, comboSymbolReportLeft.symbolsArray.map((card) => card.cardName))) {
                let match = doesItCombo(card.cardName, this.symbolsRight, card.symbols)
                if (match != null) {
                    matches.push(match)
                }
            }
        })
        this.matches = matches
    }

    compute1DepthMatches(comboSymbolReportRight, comboSymbolReportLeft) {
        this.matches.forEach((match) => {
            let matches1Depth = new Array()
            
            let cardsLeft = getRemainingCards([this.cardName, match.matchedCardName], comboSymbolReportLeft.symbolsArray)
            cardsLeft.forEach((card) => {
                let match1Depth = doesItCombo(card.cardName, comboSymbolReportRight.symbolsArray.find((s) => s.cardName == match.matchedCardName).symbols, card.symbols)
                if (match1Depth != null) {
                    matches1Depth.push(match1Depth)
                }
            })
            
            if (matches1Depth.length > 0) {
                match.set1DepthMatch(matches1Depth)
            }
        })
    }

    setComboPotentialAsFirst(value) {
        this.comboPotentialAsFirst = value
    }
}

function getRemainingCards(currentCards, symbolsArray){
    let indexes = new Array()
    currentCards.forEach((card) => {
        let i = symbolsArray.map((s) => s.cardName).indexOf(card)
        if (i > -1)
            indexes.push(i)
    })
    let cardsLeft = new Array()
    symbolsArray.forEach((s, index) => {
        if (!indexes.includes(index)){
            cardsLeft.push(s) 
        }
    })
    return cardsLeft
}

function isSameCard(currentCardName, cardName, cardList) {
    if (cardName != currentCardName) {
        return false
    }
    if (cardList.filter((card) =>  card == currentCardName ).length == 1) {
        return true
    }
    return false
}

class Matches {
    constructor(matchedCardName, symbolsMatched) {
        this.matchedCardName = matchedCardName
        this.symbolsMatched = symbolsMatched
    }

    set1DepthMatch(matches) {
        this.matches1depth = matches
    }
}

function doesItCombo(matchedCardName, symbolsRight, symbolsLeft) {
    if (symbolsLeft.includes("bianco")) {
        return new Matches(matchedCardName, symbolsLeft)
    }
    if (symbolsRight.includes("vuoto")) {
        return null
    }
    let matches = new Array()
    symbolsRight.forEach((s) => {
        if (symbolsLeft.includes(s)) {
            matches.push(s)
        }
    })
    if (matches.length > 0) {
        return new Matches(matchedCardName, matches)
    }
    return null
}