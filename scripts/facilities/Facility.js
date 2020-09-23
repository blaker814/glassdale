export const FacilityHTML = (facilityObj, criminals) => {
    return `
        <section id="facility-${facilityObj.id}" class="facility-card">
            <h3>${facilityObj.facilityName}</h3>
            <p>Security Level: ${facilityObj.securityLevel}</p>
            <p>Capacity: ${facilityObj.capacity}</p>
            <div>
                <h4>Criminals</h4>
                <ul>
                    ${criminals.map(c => `<li>${c.name}</li>`).join("")}
                </ul>
            </div>
        </section>
    `
}