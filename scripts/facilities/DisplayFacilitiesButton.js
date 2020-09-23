import { makeWitnessBtn } from "../witnesses/WitnessList.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "facilityBtn") {
        
        eventHub.dispatchEvent(new CustomEvent("facilitiesButtonClicked"))

        if (clickEvent.target.textContent === "Show Facilities") {
            clickEvent.target.textContent = "Hide Facilities"
        } else if (clickEvent.target.textContent === "Hide Facilities") {
            clickEvent.target.textContent = "Show Facilities"
        }

        const contentTarget = document.querySelector("#witnessStatementsBtn")
        if (contentTarget.textContent === "Hide Witness Statements") {
            makeWitnessBtn()
        }
    }
})

export const DisplayFacilitiesButton = () => {
    const contentTarget = document.querySelector(".facility__button")
    contentTarget.innerHTML = `<button type="button" id="facilityBtn">Show Facilities</button>`
}