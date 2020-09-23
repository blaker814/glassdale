import { getFacilities, useFacilities } from "./FacilityProvider.js"
import { FacilityHTML } from "./Facility.js"
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js"
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"

const addFacilitiesToDOM = (arrayOfFacilities, allRelationships, allCriminals) => {
    const domElement = document.querySelector(".criminalsContainer")
    domElement.innerHTML = `
        <h2>Facilities</h2>
        ${arrayOfFacilities.map(
            facilityObject => {
                // Step 2 - Filter all relationships to get only ones for this facility
                const criminalRelationshipsForThisFacility = allRelationships.filter(cf => cf.facilityId === facilityObject.id)
    
                // Step 3 - Convert the relationships to facilities with map()
                const criminals = criminalRelationshipsForThisFacility.map(cf => {
                    const matchingCriminalObject = allCriminals.find(criminal => criminal.id === cf.criminalId)
                    return matchingCriminalObject
                })
    
                // Must pass the matching facilities to the Criminal component
                return FacilityHTML(facilityObject, criminals)
            }
        ).join("")}
    `
}

export const FacilityList = () => {
    getFacilities()
        .then(getCriminalFacilities)
        .then(getCriminals)
        .then(() => {
            const facilityArray = useFacilities();
            const crimFac = useCriminalFacilities()
            const criminalArray = useCriminals()
            addFacilitiesToDOM(facilityArray, crimFac, criminalArray)
            }
        )
}