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

export const CriminalHTML = (criminalObj, facilities) => {
    return `
        <section id="criminal-${criminalObj.id}" class="criminal-card">
            <h3>${criminalObj.name}</h3>
            <p>Age: ${criminalObj.age}</p>
            <p>Crime: ${criminalObj.conviction}</p>
            <p>Arrested by ${criminalObj.arrestingOfficer}</p>
            <p>Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
            <p>Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
            <div>
                <h4>Facilities</h4>
                <ul>
                    ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
                </ul>
            </div>
            <button id="associates--${criminalObj.id}">Associate Alibis</button>
            ${AlibiDialog(criminalObj.id)}
        </section>
    `
}