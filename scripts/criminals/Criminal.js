export const CriminalHTML = criminalObj => {
    return `
        <section id="criminal-${criminalObj.id}" class="criminal-card">
            <h3>${criminalObj.name}</h3>
            <p>Age: ${criminalObj.age}</p>
            <p>Crime: ${criminalObj.conviction}</p>
            <p>Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</p>
            <p>Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</p>
        </section>
    `
}