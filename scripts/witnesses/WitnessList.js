import { getWitnesses, useWitnesses } from "./WitnessDataProvider.js"
import { WitnessHTML } from "./Witness.js"
import { CriminalList } from "../criminals/CriminalList.js"
import { DisplayFacilitiesButton } from "../facilities/DisplayFacilitiesButton.js"

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
    btnPlacement.innerHTML = `
    <div class="buttons">
        <button type="button" id="witnessStatementsBtn">Show Witness Statements</button>
    </div>
    `
}

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.textContent === "Show Witness Statements") {
        const btn = document.querySelector(".buttons");
        btn.innerHTML = `
            <button type="button" id="witnessStatementsBtn">Hide Witness Statements</button>
        `
        WitnessList();

        const contentTarget = document.querySelector(".facility__button")
        if (contentTarget.textContent === "Hide Facilities") {
            DisplayFacilitiesButton()
        }
    }
})

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.textContent === "Hide Witness Statements") {
        const btn = document.querySelector(".buttons");
        btn.innerHTML = `
            <button type="button" id="witnessStatementsBtn">Show Witness Statements</button>
        `
        CriminalList();

        const contentTarget = document.querySelector(".facility__button")
        if (contentTarget.textContent === "Hide Facilities") {
            DisplayFacilitiesButton()
        }
    }
})