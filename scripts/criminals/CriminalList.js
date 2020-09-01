import { getCriminals, useCriminals } from './CriminalProvider.js'
import { CriminalHTML } from './Criminal.js'
import { getConvictions } from '../convictions/ConvictionProvider.js'
import { useOfficers } from '../officers/OfficerProvider.js'

const eventHub = document.querySelector(".container")

eventHub.addEventListener("crimeChosen", event => {
    // You remembered to add the id of the crime to the event detail, right?
    if ("crimeThatWasChosen" in event.detail) {
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
    } 
})

eventHub.addEventListener("officerSelected", event => {
    if ("officer" in event.detail) {
        getCriminals()
            .then(() => {
            const criminalArray = useCriminals()
            const matchingCriminals = criminalArray.filter(criminal => {
                return (criminal.arrestingOfficer === event.detail.officer)
            })
            addCriminalsToDOM(matchingCriminals)
        })
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