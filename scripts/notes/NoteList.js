import { NoteHTML } from "./Note.js"
import { useNotes, getNotes } from "./NoteProvider.js"
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", event => {
    const noteArray = useNotes();
    const suspectArray = useCriminals();
    addNotesToDOM(noteArray, suspectArray)
})

export const NoteList = () => {
    getNotes()
        .then(getCriminals)
        .then(() => {
            const noteArray = useNotes();
            const suspectArray = useCriminals();
            addNotesToDOM(noteArray, suspectArray)
            }
        )
}

const addNotesToDOM = (arrayOfNotes, arrayOfSuspects) => {
    const domElement = document.querySelector(".notesContainer")
    let HTMLForNotes = arrayOfNotes.map(note => {
        
        note.suspectObj = arrayOfSuspects.find(suspect => {
            return suspect.id === parseInt(note.suspectId)
        })

        return NoteHTML(note)

    })

    domElement.innerHTML = `
        <h2>Notes</h2>
            ${HTMLForNotes.join("")}
    `
}