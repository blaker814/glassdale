/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions, getConvictions } from "./ConvictionProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".filters__crime")

eventHub.addEventListener("change", event => {
    // Only do this if the `crimeSelect` element was changed
    if (event.target.id === "crimeSelect") {
        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: event.target.value
            }
        })
        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

export const ConvictionSelect = () => {
    // Get all convictions from application state
    getConvictions()
        .then(() => {
            const convictions = useConvictions()
            convictions.sort(compare);
            render(convictions)
        })
}

const render = convictionsCollection => {
    
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(crimeObj => {
                    return `
                        <option value="${crimeObj.name}">${crimeObj.name}</option>
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

  