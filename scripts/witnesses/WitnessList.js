const addWitnessesToDOM = arrayOfWitnesses => {
    const domElement = document.querySelector(".criminalsContainer")
    const HTMLArray = arrayOfWitnesses.map(witness => WitnessHTML(witness))
    domElement.innerHTML = `
        <h2>Witnesses</h2>
        <button 
        ${HTMLArray.join("")}
    `
}

export const WitnessList = () => {
    getWitnesses()
        .then(() => {
            const witnessArray = useWitnesses();
            addWitnessesToDOM(witnessArray)
            }
        )
}

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.textContent === "Witness Statements") {
        
    }
})