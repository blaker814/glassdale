export const NoteHTML = noteObj => {
    return `
        <section id="note-${noteObj.id}" class="note-card">
            <h3>Note</h3>
            <p>Note: ${noteObj.noteText}</p>
            <p>Suspect: ${noteObj.suspectObj.name}</p>
            <p>Note Date: ${new Date(noteObj.date).toLocaleDateString('en-US')}</p>
            <button id="editNote--${noteObj.id}">Edit</button>
            <button id="deleteNote--${noteObj.id}">Delete</button>
        </section>
    `
}