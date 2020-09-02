const contentTarget = document.querySelector(".noteFormContainer")

const render = () => {
    contentTarget.innerHTML = `
        <input type="text" id="note-text">
        <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    render()
}