import { NoteHTML } from "./Note.js"
import { useNotes, getNotes, deleteNote } from "./NoteProvider.js"
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", event => {
    const noteArray = useNotes();
    const suspectArray = useCriminals();
    addNotesToDOM(noteArray, suspectArray)
})

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = event.target.id.split("--")
        deleteNote(id)
    }
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