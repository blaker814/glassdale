import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"
import { saveNote } from "./NoteProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        const noteInput = document.querySelector("#note-text")
        const noteSuspect = document.querySelector("#note-suspect")

        if(noteSuspect.value !== "0") {
            const newNote = {
                noteText: noteInput.value,
                date: Date.now(),
                suspect: noteSuspect.value
            }
            saveNote(newNote)
            .then(() => {
                const criminalsArray = useCriminals()
                criminalsArray.sort(compare);
                render(criminalsArray)
            })
        } else {
            alert("Choose a suspect")
        }

    }
})

const render = criminalArray => {
    contentTarget.innerHTML = `
        <h2>Notes</h2>
            <fieldset>
                <label for="note-text">Note: </label>
                <textarea placeholder="Put note here..." id="note-text"></textarea>
            </fieldset>
            <fieldset>
                <label for="note-suspect">Suspect: </label>
                <select class="dropdown" id="note-suspect">
                    <option value="0">Please select a suspect...</option>
                    ${
                        criminalArray.map(criminalObj => {
                            return `
                                <option value="${criminalObj.name}">${criminalObj.name}</option>
                            `
                        }).join("")
                    })
                }
                </select>
            </fieldset>
            <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    getCriminals()
        .then(() => {
            const criminalsArray = useCriminals()
            criminalsArray.sort(compare);
            render(criminalsArray)
        })
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