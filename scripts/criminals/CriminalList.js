import { getCriminals, useCriminals } from './CriminalProvider.js'
import { CriminalHTML } from './Criminal.js'

const eventHub = document.querySelector(".container")

eventHub.addEventListener("crimeChosen", event => {
    // You remembered to add the id of the crime to the event detail, right?
    if ("crimeThatWasChosen" in event.detail && event.detail.crimeThatWasChosen !== "0") {
        /*
            Filter the criminals application state down to the people that committed the crime
        */
       getCriminals().then(() => {
        const criminalArray = useCriminals()
        const matchingCriminals = criminalArray.filter(criminal => {
            return (criminal.conviction === event.detail.crimeThatWasChosen)
        })

        addCriminalsToDOM(matchingCriminals)
    })
    } else {
        CriminalList();
    }
})

eventHub.addEventListener("officerSelected", event => {
    if ("officer" in event.detail && event.detail.officer !== "0") {
        getCriminals()
            .then(() => {
            const criminalArray = useCriminals()
            const matchingCriminals = criminalArray.filter(criminal => {
                return (criminal.arrestingOfficer === event.detail.officer)
            })
            addCriminalsToDOM(matchingCriminals)
        })
    } else {
        CriminalList();
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