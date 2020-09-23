import { getCriminals, useCriminals } from './CriminalProvider.js'
import { CriminalHTML } from './Criminal.js'
import { getFacilities, useFacilities } from '../facilities/FacilityProvider.js';
import { getCriminalFacilities, useCriminalFacilities } from '../facilities/CriminalFacilityProvider.js';
import { FacilityList } from '../facilities/FacilityList.js';

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

eventHub.addEventListener("facilitiesButtonClicked", event => {
    const contentTarget = document.querySelector(".facility__button")
    if (contentTarget.textContent === "Show Facilities") {
        FacilityList()
    } else if (contentTarget.textContent === "Hide Facilities") {
        CriminalList()
    }
})

export const CriminalList = () => {
    getCriminals()
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then(() => {

            const facilities = useFacilities()
            const crimFac = useCriminalFacilities()
            criminalArray = useCriminals()
            addCriminalsToDOM(criminalArray, facilities, crimFac)
        }
    )
}

const addCriminalsToDOM = (criminalsToRender, allFacilities, allRelationships) => {
    // Step 1 - Iterate all criminals
    const contentTarget = document.querySelector(".criminalsContainer")
    contentTarget.innerHTML = `
    <h2>Criminals</h2>
    ${criminalsToRender.map(
        criminalObject => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminalObject.id)

            // Step 3 - Convert the relationships to facilities with map()
            const facilities = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
                return matchingFacilityObject
            })

            // Must pass the matching facilities to the Criminal component
            return CriminalHTML(criminalObject, facilities)
        }
    ).join("")}
    `
}