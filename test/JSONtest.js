import {test} from "node:test"

import { testPozione, testFendenteSfoderante } from "./PlayerCardTest.js"
import { writeToFile, readFromFile } from "../cards/JSONhelper.js"
import { assert } from "console"

test("scritturaPozione", (t) => {
    const pozione = testPozione()
    writeToFile("test/PozioneTest.json", pozione)
    assert(pozione == readFromFile("test/PozioneTest.json"))
})

test("scritturaMano", (t) => {
    const mano = new Array(testPozione(), testFendenteSfoderante())
    writeToFile("test/ManoTest.json", mano)
    assert(mano == readFromFile("test/ManoTest.json"))
})