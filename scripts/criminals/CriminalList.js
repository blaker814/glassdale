import { getCriminals, useCriminals } from './CriminalProvider.js'
import { CriminalHTML } from './Criminal.js'

const eventHub = document.querySelector(".container")

eventHub.addEventListener("crimeChosen", event => {
    // You remembered to add the id of the crime to the event detail, right?
    if (event.detail.crimeThatWasChosen !== "0") {
        const matchingCriminals = useCriminals().filter(criminal => {
            return criminal.conviction === event.detail.crimeThatWasChosen
        })
        addCriminalsToDOM(matchingCriminals)
    } else {
        addCriminalsToDOM(useCriminals());
    }
})

eventHub.addEventListener("officerSelected", event => {
    if (event.detail.officer !== "0") {
        const matchingCriminals = useCriminals().filter(criminal => {
            return (criminal.arrestingOfficer === event.detail.officer)
        })
        addCriminalsToDOM(matchingCriminals)
    } else {
        addCriminalsToDOM(useCriminals());
}
})

export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()
            addCriminalsToDOM(criminalArray)
        }
    )
}

const addCriminalsToDOM = arrayOfCriminals => {
    const domElement = document.querySelector(".criminalsContainer")
    const HTMLArray = arrayOfCriminals.map(criminal => CriminalHTML(criminal))
    domElement.innerHTML = HTMLArray.join("");
}