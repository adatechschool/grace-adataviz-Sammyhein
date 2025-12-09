export function filtreFavoris(events, counter){
    const filtre = document.querySelector(".filtreFavoris")
    const error = document.getElementById("erreurFavoris")
    const returnBouton = document.getElementById("returnBouton")

    let filtreActif = false

    //let hasResults = false // meme logique pour que la barre de recherche

    filtre.addEventListener("click", () => {

        //en gros quand on clique ça devient "true" et redevient "false" si on reclique
        filtreActif = !filtreActif

        if(filtreActif && counter.value === 0){
            error.hidden = false
        }else{
            error.hidden = true
        }

        events.forEach(item => {
            const carte = item.element

            if(filtreActif){
                carte.classList.toggle("hide", carte.dataset.favori !== "true")
            } else {
                carte.classList.remove("hide")
            }
        })
    })

    if(returnBouton.hidden === false){
        error.hidden = true
    }
}