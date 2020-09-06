export const WitnessHTML = witnessObj => {
    return `
        <section id="witness-${witnessObj.id}" class="witness-card">
            <h3>${witnessObj.name}</h3>
            <p>${witnessObj.statements}</p>
        </section>
    `
}