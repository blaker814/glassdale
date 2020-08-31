export const OfficerHTML = officerObj => {
    return `
        <section id="officer-${officerObj.id}" class="officer-card">
            <h2>Name: ${officerObj.name}</h2>
        </section>
    `
}