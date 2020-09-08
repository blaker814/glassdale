import { AlibiDialog } from "./AlibiDialog.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("associates--")) {
        const [ btntag, criminalId ] = clickEvent.target.id.split("--")
        const alibiEvent = new CustomEvent("associatesClicked", {
            detail: {
                chosenCriminal: criminalId
            }
        })
        eventHub.dispatchEvent(alibiEvent)
    }
})

export const CriminalHTML = criminalObj => {
    return `
        <section id="criminal-${criminalObj.id}" class="criminal-card">
            <h3>${criminalObj.name}</h3>
            <p>Age: ${criminalObj.age}</p>
            <p>Crime: ${criminalObj.conviction}</p>
            <p>Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
            <p>Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
            <button id="associates--${criminalObj.id}" toggle>Associate Alibis</button>
            ${AlibiDialog(criminalObj.id)}
        </section>
    `
}