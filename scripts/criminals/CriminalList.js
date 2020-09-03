import { getCriminals, useCriminals } from './CriminalProvider.js'
import { CriminalHTML } from './Criminal.js'

const eventHub = document.querySelector(".container")
let chosenCrime = "0";
let chosenOfficer = "0";
let criminalArray = [];
let matchingCriminals = [];

eventHub.addEventListener("crimeChosen", event => {
    chosenCrime = event.detail.crimeThatWasChosen;
    if (chosenCrime !== "0" && chosenOfficer !== "0") {
        matchingCriminals = criminalArray.filter(criminal => {
            return criminal.conviction === chosenCrime 
                && criminal.arrestingOfficer === chosenOfficer
        })
        addCriminalsToDOM(matchingCriminals)
    } else if (chosenCrime !== "0" && chosenOfficer === "0") {
        matchingCriminals = criminalArray.filter(criminal => {
            return criminal.conviction === chosenCrime 
        })
        addCriminalsToDOM(matchingCriminals)
    } else if (chosenCrime === "0" && chosenOfficer !== "0") {
        matchingCriminals = criminalArray.filter(criminal => {
            return criminal.arrestingOfficer === chosenOfficer
        })
        addCriminalsToDOM(matchingCriminals)
    } else {
        addCriminalsToDOM(criminalArray);
    }
})

eventHub.addEventListener("officerSelected", event => {
    chosenOfficer = event.detail.officer;
    if (chosenOfficer !== "0" && chosenCrime !== "0") {
        matchingCriminals = criminalArray.filter(criminal => {
            return criminal.arrestingOfficer === chosenOfficer 
                && criminal.conviction === chosenCrime
        })
        addCriminalsToDOM(matchingCriminals)
    } else if (chosenOfficer !== "0" && chosenCrime === "0"){
        matchingCriminals = criminalArray.filter(criminal => {
            return criminal.arrestingOfficer === chosenOfficer 
        })
        addCriminalsToDOM(matchingCriminals)
    } else if (chosenOfficer === "0" && chosenCrime !== "0"){
        matchingCriminals = criminalArray.filter(criminal => {
            return criminal.conviction === chosenCrime
        })
        addCriminalsToDOM(matchingCriminals)
    } else {
        addCriminalsToDOM(criminalArray);
    }
})

export const CriminalList = () => {
    getCriminals()
        .then(() => {
            criminalArray = useCriminals()
            addCriminalsToDOM(criminalArray)
        }
    )
}

const addCriminalsToDOM = arrayOfCriminals => {
    const domElement = document.querySelector(".criminalsContainer")
    const HTMLArray = arrayOfCriminals.map(criminal => CriminalHTML(criminal))
    domElement.innerHTML = HTMLArray.join("");
}