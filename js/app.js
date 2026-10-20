"use strict";

import { films } from "./data.js";
console.log(films);

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
const prixTotal = document.getElementById("prix-total")
const voterFilmSelectione = document.getElementById("voter-film-selectione")

// ==================================================
// 0 BIS - MÉMORISER L'ÉTAT DE L'APPLICATION
// ==================================================
// OBJECTIF : mémoriser temporairement le film, la séance et les sièges choisis.
// Les données décrivent les films ; l'état décrit les choix actuels de l'utilisateur.
// NOTIONS UTILES : let, null, tableau vide [].
// PISTES : que faut-il remettre à zéro lorsqu'un autre film est choisi ?
// TODO : déclarez trois variables avec des valeurs initiales adaptées.
// ÉCRIVEZ VOTRE CODE ICI :


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
                <button type="submit" data-clicked="0" data-film-id="${film.id}"  class="btn-select mt-4 w-full rounded-xl px-4 py-3 font-extrabold text-white bg-cine-red">Choisir ce Film</button>
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

document.querySelectorAll(".btn-select").forEach((ele) => {
    ele.addEventListener("click", (e) => {
        e.preventDefault()
        changeButton(e.target)
    })
})

const changeButton = (button) => {
    if (button.dataset.clicked == 1) {
        button.classList = "btn-select mt-4 w-full rounded-xl px-4 py-3 font-extrabold text-white bg-cine-red";
        button.dataset.clicked = "0"
        button.innerHTML = "Coisir ce film"
    } else {
        button.classList = "btn-select mt-4 w-full rounded-xl px-4 py-3 font-extrabold text-black bg-cine-gray border-2 border-black";
        button.dataset.clicked = "1"
        button.innerHTML = "film selectione"
    }
    console.log(films.find((ele) => ele.id == button.dataset.filmId));
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


// ==================================================
// US04 - SÉLECTIONNER UNE SÉANCE
// ==================================================
// OBJECTIF : mémoriser la séance cliquée et montrer visuellement le bouton actif.
// NOTIONS UTILES : addEventListener, find(), classList, conditions.
// QUESTIONS : Faut-il autoriser une séance qui n'appartient pas au film choisi ?
// TODO : retrouver la séance, modifier l'état et réinitialiser les sièges choisis.
// ÉCRIVEZ VOTRE CODE ICI :


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


// ==================================================
// US08 - CONFIRMER LA RÉSERVATION
// ==================================================
// OBJECTIF : vérifier les choix puis afficher un succès ou une erreur dans
// #reservation-message. Les données restent seulement en mémoire.
// NOTIONS UTILES : if / else, addEventListener, textContent, classList.
// QUESTIONS : Quelles conditions rendent une réservation valide ?
// TODO : écouter #confirmer-reservation et construire un message clair.
// ÉCRIVEZ VOTRE CODE ICI :


// PREMIER TEST CONSEILLÉ :
// console.log(films);
// Décommentez temporairement cette ligne pour explorer les données, puis avancez.
