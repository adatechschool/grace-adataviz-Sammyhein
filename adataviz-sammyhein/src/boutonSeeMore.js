export function createBoutonSeeMore (descriptionText, boite){
    //Création bouton See More
    const boutonSeeMore = document.createElement("button")
        boutonSeeMore.className = "boutonSeeMore"
        boutonSeeMore.innerText = "Voir Plus"

    //Click bouton See More
    boutonSeeMore.addEventListener("click", () =>{
        console.log("Hello World")

        //Faire disparaitre le bouton
        boutonSeeMore.hidden = true

        //Faire apparaitre la description
        const description = document.createElement("p")
        description.className = "description"
        description.innerHTML = descriptionText
        description.hidden = false

        boite.appendChild(description)

        //Créer un bouton See Less
        const boutonSeeLess = document.createElement("button")
        boutonSeeLess.className = "boutonSeeLess"
        boutonSeeLess.innerText = "Voir Moins"
        boite.querySelector(".boiteText").appendChild(boutonSeeLess)

        //Click Bouton See Less
        boutonSeeLess.addEventListener("click", () => {
            console.log("Hello World")

            boutonSeeLess.hidden = true

            boutonSeeMore.hidden = false

            description.hidden = true

        })
    })

    return boutonSeeMore

}