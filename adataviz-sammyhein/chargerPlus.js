export async function chargerPlus(limitValue, offsetValue, functionName){

    const bouton = document.getElementById("boutonChargerPlus")

    bouton.addEventListener("click", () => {
        console.log("hello")
        offsetValue += limitValue
        functionName()
    })
}