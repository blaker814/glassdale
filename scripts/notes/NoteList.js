import { NoteHTML } from "./Note.js"
import { useNotes, getNotes, deleteNote, editNote } from "./NoteProvider.js"
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js"
import { NoteForm } from "./NoteForm.js"

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

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("editNote--")) {
        const [prefix, id] = event.target.id.split("--")
        const noteToBeEdited = useNotes().find(note => note.id === parseInt(id))
        EditNoteHTML(noteToBeEdited)
        
    }
})

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("saveNoteBtn--")) {
        const [prefix, id] = event.target.id.split("--")
        const foundNote = useNotes().find(note => note.id === parseInt(id))
        const editedNoteObj = {
            noteText: document.querySelector("#noteEdit").value,
            date: foundNote.date,
            suspectId: foundNote.suspectId,
            id: parseInt(id)
        }
        editNote(editedNoteObj).then(NoteList)
        
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

const EditNoteHTML = noteObj => {
    const contentTarget = document.querySelector(`#note-${noteObj.id}`)
    contentTarget.innerHTML = `
        <h3>Note</h3>
        <p>Note: <input type="text" id="noteEdit" value="${noteObj.noteText}"></p>
        <p>Suspect: ${noteObj.suspectObj.name}</p>
        <p>Note Date: ${new Date(noteObj.date).toLocaleDateString('en-US')}</p>
        <button id="saveNoteBtn--${noteObj.id}">Save</button>
    `
}