import { getWitnesses, useWitnesses } from "./WitnessDataProvider.js"
import { WitnessHTML } from "./Witness.js"
import { CriminalList } from "../criminals/CriminalList.js"

const eventHub = document.querySelector(".container")

const addWitnessesToDOM = arrayOfWitnesses => {
    const domElement = document.querySelector(".criminalsContainer")
    const HTMLArray = arrayOfWitnesses.map(witness => WitnessHTML(witness))
    domElement.innerHTML = `
        <h2>Witnesses</h2>
        ${HTMLArray.join("")}
    `
}

const WitnessList = () => {
    getWitnesses()
        .then(() => {
            const witnessArray = useWitnesses();
            addWitnessesToDOM(witnessArray)
            }
        )
}

export const makeWitnessBtn = () => {
    const btnPlacement = document.querySelector(".filters__witness");
    btnPlacement.innerHTML += `
    <div class="buttons">
        <button type="button" id="witnessStatementsBtn">WitnessStatements</button>
    </div>
    `
}

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "witnessStatementsBtn") {
        const btn = document.querySelector(".buttons");
        btn.innerHTML = `
            <button type="button" id="criminalsBtn">Criminals</button>
        `
        WitnessList();
    }
})

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "criminalsBtn") {
        const btn = document.querySelector(".buttons");
        btn.innerHTML = `
            <button type="button" id="witnessStatementsBtn">Witness Statements</button>
        `
        CriminalList();
    }
})