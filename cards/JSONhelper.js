import fs from "fs"


export function writeToFile(fileName, data) {
    const dataAsString = JSON.stringify(data, null, 2)

    fs.writeFileSync(fileName, dataAsString, (error) => {
        if (error) {
            console.error(error)
            throw error
        }
    })

    console.log("Scritto oggetto")
}

export function readFromFile(fileName) {
    const data = fs.readFileSync(fileName)

    return JSON.parse(data)
}

export function writeTierToFile(weapon, tier, cards) {
    writeToFile("cards/"+weapon+"/"+tier, cards)
}