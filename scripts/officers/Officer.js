export const OfficerHTML = officerObj => {
    return `
        <section id="officer-${officerObj.id}" class="officer-card">
            <h3>${officerObj.name}</h3>
        </section>
    `
}