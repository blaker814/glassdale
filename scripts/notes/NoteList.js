import { NoteHTML } from "./Note.js"
import { useNotes, getNotes } from "./NoteProvider.js"

const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", event => {
    const notesArray = useNotes();
    notesArray.map(note => NoteHTML(note)).join("")
    addNotesToDOM(notesArray)
})

export const NoteList = () => {
    getNotes()
        .then(() => {
            const noteArray = useNotes();
            addNotesToDOM(noteArray)
            }
        )
}

const addNotesToDOM = arrayOfNotes => {
    const domElement = document.querySelector(".notesContainer")
    let HTMLArray = arrayOfNotes.map(note => NoteHTML(note))
    domElement.innerHTML = `
        <h2>Notes</h2>
            ${HTMLArray.join("")}
    `
}