import { OfficerHTML } from "./Officer.js"
import { useOfficers, getOfficers } from "./OfficerProvider.js"

export const OfficerList = () => {
    getOfficers()
        .then(() => {
            const officerArray = useOfficers();
            addOfficersToDOM(officerArray)
            }
        )
}

const addOfficersToDOM = arrayOfOfficers => {
    const domElement = document.querySelector(".officersContainer")
    let HTMLArray = arrayOfOfficers.map(officer => OfficerHTML(officer))
    domElement.innerHTML = HTMLArray.join("")
}