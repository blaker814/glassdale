/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */
import { useConvictions } from "./ConvictionProvider.js"

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")

export const ConvictionSelect = () => {
    // Get all convictions from application state
    const convictions = useConvictions()
    convictions.sort(compare);
    render(convictions)
}

const render = convictionsCollection => {
    
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(crimeObj => {
                    return `
                        <option value="crime-${crimeObj.id}">${crimeObj.name}</option>
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