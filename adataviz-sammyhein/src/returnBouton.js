export function showReturnBouton (inputElement){
    const returnBouton = document.getElementById("returnBouton")

    const bouton = document.getElementById("boutonRetour")
    

    bouton.addEventListener("click", () =>{
        returnBouton.hidden = true

        inputElement.value = ""

        inputElement.dispatchEvent(new Event("input")) // ça fait comme si l’utilisateur avait retapé quelque chose et relance le searchInput.addEventListener
                                                    // sans cette dernière ligne, mes événements ne s'affichent plus 

    })
}