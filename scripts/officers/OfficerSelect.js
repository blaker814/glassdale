import { getOfficers, useOfficers } from "./OfficerProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__officer")

eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value

        // Define a custom event
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })

        // Dispatch event to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

export const OfficerSelect = () => {
    // Get all Officers from application state
    getOfficers()
        .then(() => {
            const officers = useOfficers()
            officers.sort(compare)
            render(officers)
        })
}

const render = officersCollection => {
    
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select a officer...</option>
            ${
                officersCollection.map(officerObj => {
                    return `
                        <option value="${officerObj.name}">${officerObj.name}</option>
                    `
                })
            }
        </select>
    `
}

const compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const crimeA = a.name.toUpperCase();
    const crimeB = b.name.toUpperCase();
  
    let comparison = 0;
    if (crimeA > crimeB) {
      comparison = 1;
    } else if (crimeA < crimeB) {
      comparison = -1;
    }
    return comparison;
  }