import { useCriminals } from "./CriminalProvider.js"


const eventHub = document.querySelector(".container")

eventHub.addEventListener("associatesClicked", event => {
    const targetCriminal = useCriminals().find(criminal => {
        return criminal.id === parseInt(event.detail.chosenCriminal)
    })
    
    const alibiTarget = document.querySelector(`.alibiDialog--${targetCriminal.id}`)

    if (alibiTarget.innerHTML === "") {
        alibiTarget.innerHTML = `${
            targetCriminal.known_associates.map(associate => {
                return `
                    <h4>${associate.name}</h4>
                    <div>${associate.alibi}</div>
                `
            }).join("")
        }`
    } else {
        alibiTarget.innerHTML = ""
    }
})

export const AlibiDialog = id => {
    return `
        <span class="alibiDialog--${id}"></span>
    `
}