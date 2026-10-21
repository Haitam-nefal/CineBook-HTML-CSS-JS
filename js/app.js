"use strict";

import { films } from "./data.js";

// Bienvenue dans le fichier de travail principal de CineBook !
// Le HTML et les données sont prêts, mais les interactions sont volontairement absentes.
// La page contient déjà un exemple statique complet pour montrer le résultat attendu.
// Inspectez et copiez la structure HTML utile, puis remplacez ces exemples avec
// les éléments que votre code crée à partir des tableaux de data.js.
// Avancez section par section et testez souvent dans le navigateur.

// ==================================================
// 0 - SÉLECTIONNER LES ÉLÉMENTS HTML
// ==================================================
// OBJECTIF : garder des références vers les zones qui seront modifiées.
// NOTIONS UTILES : const, document.querySelector(), document.getElementById().
// QUESTIONS : Quel identifiant correspond au catalogue ? Au prix total ?
// TODO : créez ici des constantes explicites pour les éléments nécessaires.
// ÉCRIVEZ VOTRE CODE ICI :

const filmsContainer = document.getElementById("films-container");
const voterFilmSelectione = document.getElementById("film-selectioner")
const prixTotal = document.getElementById("prix-total")
const seancesContainer = document.getElementById("seances-container")
const affichageCartFilm = document.getElementById("affichage-comande-film")
const siegesContainer = document.getElementById("sieges-container")

// ==================================================
// 0 BIS - MÉMORISER L'ÉTAT DE L'APPLICATION
// ==================================================
// OBJECTIF : mémoriser temporairement le film, la séance et les sièges choisis.
// Les données décrivent les films ; l'état décrit les choix actuels de l'utilisateur.
// NOTIONS UTILES : let, null, tableau vide [].
// PISTES : que faut-il remettre à zéro lorsqu'un autre film est choisi ?
// TODO : déclarez trois variables avec des valeurs initiales adaptées.
// ÉCRIVEZ VOTRE CODE ICI :

let SelectioneSeance = []
let filmSelectiones = []



// ==================================================
// US01 - AFFICHER LES FILMS
// ==================================================
// OBJECTIF : créer une carte pour chaque objet du tableau "films" et l'ajouter
// dans #films-container.
// NOTIONS UTILES : forEach, createElement ou innerHTML, propriétés d'un objet.
// QUESTIONS : Comment parcourir films ? Comment utiliser film.affiche et film.titre ?
// TODO : 1) vider les cartes statiques ; 2) construire les cartes ; 3) les insérer.
// PISTE : ajoutez l'identifiant du film dans un attribut data-film-id du bouton.
// MODÈLE : observez l'élément <article data-film-id="1"> dans index.html.
// ÉCRIVEZ VOTRE CODE ICI :

const formateTime = (duree) => {
    const hour = duree / 60
    const minute = duree % 60
    return minute === 0
        ? `${hour.toFixed(0)} h`
        : `${hour.toFixed(0)} h ${minute} minute`
}

const createCartFilm = () => {
    films.forEach((film) => {
        const cart = `
                <article data-id="${film.id}" class="overflow-hidden rounded-2xl border border-red-400 bg-white shadow-xl ring-2 ring-red-100"
              data-film-id="1">
              <div class="relative"><img src="${film.affiche}" alt="${film.genre}-${film.titre}"
                  class="aspect-[2/3] w-full object-cover"><span
                  class="absolute bottom-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-extrabold shadow-lg">${film.prix}
                  DH</span></div>
              <div class="p-4">
                <p class="text-xs font-bold uppercase tracking-wider text-cine-red">${film.genre}</p>
                <h3 class="mt-1 text-lg font-black">${film.titre}</h3>
                <p class="mt-2 text-sm text-slate-500">${formateTime(film.duree)}</p>
                <button type="submit" data-clicked="0" data-film-id="${film.id}"  class="btn-select mt-4 w-full rounded-xl px-4 py-3 font-extrabold text-black bg-cine-gray border-2 border-black">Choisir ce Film</button>
              </div>
            </article>
        `
        filmsContainer.innerHTML += cart
    })
}

createCartFilm()

// ==================================================
// US02 - SÉLECTIONNER UN FILM
// ==================================================
// OBJECTIF : réagir au clic sur une carte, retrouver le film correspondant et
// afficher ses informations dans #film-details.
// NOTIONS UTILES : addEventListener, Number(), find(), textContent, classList.
// QUESTIONS : Où lire l'id du bouton ? Comment comparer cet id à film.id ?
// TODO : écouter les clics, modifier l'état et mettre à jour les détails.
// PISTE : un changement de film doit aussi réinitialiser séance et sièges.
// MODÈLE : #film-details contient déjà un exemple de détail à reproduire.
// ÉCRIVEZ VOTRE CODE ICI :

// ( == 1 => )
document.querySelectorAll(".btn-select").forEach((ele) => {
    ele.addEventListener("click", (e) => {
        e.preventDefault()
        changeButton(e.target)
    })
})

const changeButton = (button) => {
    const film = films.find((ele) => ele.id == button.dataset.filmId);
    if (button.dataset.clicked == 1) {
        button.classList = "btn-select mt-4 w-full rounded-xl px-4 py-3 font-extrabold text-black bg-cine-gray border-2 border-black";
        button.dataset.clicked = "0"
        button.innerHTML = "Coisir ce film"
        RemoveFilmSelection(film)
    } else {
        button.classList = "btn-select mt-4 w-full rounded-xl px-4 py-3 font-extrabold text-white bg-cine-red";
        button.dataset.clicked = "1"
        button.innerHTML = "film selectione"
        AjouteFilmSelection(film)
    }
}

// ==================================================
// US03 - AFFICHER LES SÉANCES
// ==================================================
// OBJECTIF : afficher les horaires du film sélectionné dans #seances-container.
// NOTIONS UTILES : tableau imbriqué, boucle, bouton, innerHTML.
// QUESTIONS : Dans quelle propriété du film se trouvent les séances ?
// TODO : créer un bouton par séance et conserver son id dans data-seance-id.
// MODÈLE : les trois boutons statiques de #seances-container montrent le HTML attendu.
// ÉCRIVEZ VOTRE CODE ICI :


const AjouteFilmSelection = (film) => {
    const newFilm = {
        id: film.id,
        titre: film.titre,
        genre: film.genre,
        duree: film.duree,
        prix: film.prix,
        affiche: film.affiche,
        description: film.description,
        seance: null,
        nombre_de_sieges: null,
        sieges: null
    }
    filmSelectiones.push(newFilm)
    SelectioneSeance.push({ filmId: film.id, data: film.seances })
    AffichageFilmsSelection()
    AffichageSeance()
    AffichageDeSieges()
    afficheCart()
    CalculPrixTotal()
}

const RemoveFilmSelection = (film) => {
    filmSelectiones = filmSelectiones.filter((f) => f.id != film.id)
    SelectioneSeance = SelectioneSeance.filter((f) => f.filmId != film.id)
    AffichageFilmsSelection()
    AffichageSeance()
    AffichageDeSieges()
    afficheCart()
    CalculPrixTotal()
}

const AffichageFilmsSelection = () => {
    if (filmSelectiones.length > 0) {
        voterFilmSelectione.innerHTML = ``
        filmSelectiones.forEach((film) => {
            voterFilmSelectione.innerHTML += `
                <div id="film-details" class="mt-6 grid gap-5 rounded-2xl bg-slate-50 p-5 sm:grid-cols-[100px_1fr]">
                  <img src="${film.affiche}" alt="${film.genre}-${film.titre}"
                    class="aspect-[2/3] w-24 rounded-xl object-cover shadow-md">
                  <div>
                    <div class="flex flex-wrap items-center gap-2">
                      <h3 class="text-xl font-black">${film.titre}</h3><span
                        class="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">${film.prix} DH</span>
                    </div>
                    <p class="mt-2 text-sm font-semibold text-slate-500">${film.genre} · ${formateTime(film.duree)}</p>
                    <p class="mt-3 leading-7 text-slate-600">${film.description}</p>
                  </div>
                </div>
            `
        })
    } else {
        voterFilmSelectione.innerHTML = ``
    }
}

const AffichageSeance = () => {
    if (SelectioneSeance.length > 0) {
        seancesContainer.innerHTML = ``
        SelectioneSeance.forEach((seance) => {
            console.log(seance);
            const div = document.createElement("div")
            const h3 = document.createElement("h3")
            div.classList = "border-b border-gray-300 w-full pb-3 flex justify-around items-center btnsSelectSeance"
            h3.innerHTML = `Film :=> ${seance.filmId}`

            seance.data.forEach((s) => {
                div.innerHTML += `
                    <button type="button" data-film-id="${seance.filmId}" data-seance-id="${s.id}" class="rounded-xl border border-slate-300 bg-slate-50 px-5 py-3 font-bold text-slate-700 btn-select-seance">${s.horaire}</button>
                `
            })

            seancesContainer.appendChild(h3)
            seancesContainer.appendChild(div)

        })
    } else {
        seancesContainer.innerHTML = ``
    }
    console.log(filmSelectiones);

}

// ==================================================
// US04 - SÉLECTIONNER UNE SÉANCE
// ==================================================
// OBJECTIF : mémoriser la séance cliquée et montrer visuellement le bouton actif.
// NOTIONS UTILES : addEventListener, find(), classList, conditions.
// QUESTIONS : Faut-il autoriser une séance qui n'appartient pas au film choisi ?
// TODO : retrouver la séance, modifier l'état et réinitialiser les sièges choisis.
// ÉCRIVEZ VOTRE CODE ICI :


document.getElementById("seances-container").addEventListener("click", (e) => {
    if (e.target.classList.item(e.target.classList.length - 1) === "btn-select-seance") {
        e.target.classList = "rounded-xl border border-slate-300 bg-red-800 text-white px-5 py-3 font-bold btn-select-seance"
        // console.log(e.target);
        console.log(e.target.innerHTML);
        console.log("seance Id : ", e.target.dataset.seanceId);
        console.log("Film Id : ", e.target.dataset.filmId);

        AddSeanceId(e.target.dataset.filmId, e.target.innerHTML)
    }
})

const AddSeanceId = (idFilm, seance) => {
    filmSelectiones = filmSelectiones.map((film) => {
        if (film.id == idFilm) {
            return { ...film, seance: seance }
        } else {
            return film
        }
    })
    afficheCart()
}

// ==================================================
// US05 - AFFICHER LES 30 SIÈGES
// ==================================================
// OBJECTIF : créer les rangées A à E, avec les numéros 1 à 6.
// NOTIONS UTILES : boucles imbriquées, concaténation, createElement, classList.
// QUESTIONS : Comment fabriquer le nom "C4" ? Où sont les sièges occupés ?
// TODO : générer les sièges et donner un état visuel différent aux places occupées.
// PISTE : rangees et siegesParRangee sont fournis dans data.js.
// MODÈLE : #sieges-container contient les 30 sièges statiques et leurs classes Tailwind.
// ÉCRIVEZ VOTRE CODE ICI :



const AffichageDeSieges = () => {
    if (filmSelectiones.length == 0) {
        siegesContainer.innerHTML = ``
        return
    }
    siegesContainer.innerHTML = ``
    filmSelectiones.forEach((film) => {
        siegesContainer.innerHTML += `
        <div>
        <h2>Film => ${film.id}</h2>
        <div data-film-id="${film.id}" class="mx-auto mt-8 grid max-w-sm grid-cols-[1rem_repeat(6,minmax(1.75rem,2.6rem))] justify-center gap-1.5">
        <span class="self-center text-xs font-extrabold text-slate-500">A</span><button class="aspect-square rounded-lg bg-slate-400 text-xs font-bold text-white opacity-50"
            disabled>A1</button>
            <button class="aspect-square rounded-lg bg-slate-400 text-xs font-bold text-white opacity-50" disabled>A2</button>
            <button class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">A3</button>
            <button class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">A4</button>
            <button class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">A5</button>
            <button class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">A6</button>
        <span class="self-center text-xs font-extrabold text-slate-500">B</span><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">B1</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">B2</button><button
            class="aspect-square rounded-lg bg-slate-400 text-xs font-bold text-white opacity-50"
            disabled>B3</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">B4</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">B5</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">B6</button>
        <span class="self-center text-xs font-extrabold text-slate-500">C</span><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">C1</button><button
            class="aspect-square rounded-lg bg-cine-red text-xs font-bold text-white shadow-md">C2</button><button
            class="aspect-square rounded-lg bg-cine-red text-xs font-bold text-white shadow-md">C3</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">C4</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">C5</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">C6</button>
        <span class="self-center text-xs font-extrabold text-slate-500">D</span><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">D1</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">D2</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">D3</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">D4</button><button
            class="aspect-square rounded-lg bg-slate-400 text-xs font-bold text-white opacity-50"
            disabled>D5</button><button
            class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">D6</button>
        <span class="self-center text-xs font-extrabold text-slate-500">E</span><button
        class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">E1</button><button
        class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">E2</button><button
        class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">E3</button><button
        class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">E4</button><button
        class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">E5</button><button
        class="aspect-square rounded-lg bg-blue-600 text-xs font-bold text-white">E6</button>
    </div>
        </div>
        `
    })
}


// ==================================================
// US06 - SÉLECTIONNER ET DÉSÉLECTIONNER DES SIÈGES
// ==================================================
// OBJECTIF : ajouter ou retirer une place du tableau des sièges sélectionnés.
// NOTIONS UTILES : includes(), push(), splice() ou filter(), classList.toggle().
// QUESTIONS : Comment empêcher le clic sur une place occupée ?
// TODO : écouter chaque siège disponible et actualiser son état visuel.
// ÉCRIVEZ VOTRE CODE ICI :


// ==================================================
// US07 - CALCULER LE TOTAL ET METTRE À JOUR LE RÉCAPITULATIF
// ==================================================
// OBJECTIF : afficher le film, la séance, les sièges et le montant actuel.
// NOTIONS UTILES : multiplication, length, join(), textContent.
// QUESTIONS : Quelle formule relie prix du film et nombre de sièges ?
// TODO : écrire une fonction appelée après chaque changement de sélection.
// MODÈLE : le récapitulatif HTML affiche des exemples de valeurs déjà remplies.
// ÉCRIVEZ VOTRE CODE ICI :

const afficheCart = () => {
    if (filmSelectiones.length == 0) return affichageCartFilm.innerHTML = ``
    console.log(filmSelectiones);

    affichageCartFilm.innerHTML = ``
    filmSelectiones.forEach((film) => {
        affichageCartFilm.innerHTML += `
        <dl class="mt-7 space-y-4 text-sm py-2 border-black border-b">
            <div class="flex justify-between gap-4">
                <dt class="text-slate-500">Film</dt>
                <dd id="recap-film" class="font-bold">${film.titre}</dd>
            </div>
            <div class="flex justify-between gap-4">
                <dt class="text-slate-500">Séance</dt>
                <dd id="recap-seance" class="font-bold">${film.seance === null ? "Nothing" : film.seance}</dd>
            </div>
            <div class="flex justify-between gap-4">
                <dt class="text-slate-500">Nombre de sièges</dt>
                <dd id="nombre-sieges" class="font-bold">${film.nombre_de_sieges === null ? "Nothing" : film.nombre_de_sieges}</dd>
            </div>
            <div class="flex justify-between gap-4">
                <dt class="text-slate-500">Sièges</dt>
                <dd id="sieges-selectionnes" class="font-bold">${film.sieges === null ? "Nothing" : film.sieges}</dd>
            </div>
        </dl>
        `
    })
}

const CalculPrixTotal = () => {
    prixTotal.innerHTML = filmSelectiones.reduce((acc, cur) => acc + cur.prix, 0)
}


// ==================================================
// US08 - CONFIRMER LA RÉSERVATION
// ==================================================
// OBJECTIF : vérifier les choix puis afficher un succès ou une erreur dans
// #reservation-message. Les données restent seulement en mémoire.
// NOTIONS UTILES : if / else, addEventListener, textContent, classList.
// QUESTIONS : Quelles conditions rendent une réservation valide ?
// TODO : écouter #confirmer-reservation et construire un message clair.
// ÉCRIVEZ VOTRE CODE ICI :


document.getElementById("confirmer-reservation").addEventListener("click", (e) => {
    e.preventDefault()
    console.log("reservation");
})

// PREMIER TEST CONSEILLÉ :
// console.log(films);
// Décommentez temporairement cette ligne pour explorer les données, puis avancez.
