/* ================================================= */
/* WORKSPACE - SCRIPT.JS                             */
/* ÉTAPES 1 À 85                                     */
/* ================================================= */


/* ================================================= */
/* RÉCUPÉRATION DES ÉLÉMENTS HTML                    */
/* ================================================= */

const formulaire =
    document.getElementById("reservationForm");

const listeReservations =
    document.getElementById("listeReservations");

const champDate =
    document.getElementById("date");

const champNom =
    document.getElementById("nom");


/* ================================================= */
/* RÉCUPÉRATION DES RÉSERVATIONS                     */
/* ================================================= */

let reservations =
    JSON.parse(
        localStorage.getItem("reservations")
    ) || [];


/* ================================================= */
/* DATE DU JOUR                                      */
/* ================================================= */

const aujourdHui = new Date();

const annee =
    aujourdHui.getFullYear();

const mois =
    String(aujourdHui.getMonth() + 1)
        .padStart(2, "0");

const jour =
    String(aujourdHui.getDate())
        .padStart(2, "0");

const dateAujourdHui =
    `${annee}-${mois}-${jour}`;


/* ================================================= */
/* DATE MINIMUM                                      */
/* ================================================= */

if (champDate) {

    champDate.min =
        dateAujourdHui;

}


/* ================================================= */
/* ÉTAPE 85 : COMPTEUR DU NOM                       */
/* ================================================= */

const compteurNom =
    document.getElementById("compteurNom");


if (champNom && compteurNom) {

    compteurNom.textContent =
        champNom.value.length +
        " / 30 caractères";


    champNom.addEventListener(
        "input",
        function() {

            compteurNom.textContent =
                this.value.length +
                " / 30 caractères";

        }
    );

}


/* ================================================= */
/* RÉCUPÉRATION D'UNE RÉSERVATION À MODIFIER        */
/* ================================================= */

const indexModification =
    localStorage.getItem(
        "indexReservation"
    );

const reservationAModifier =
    JSON.parse(
        localStorage.getItem(
            "reservationAModifier"
        )
    );


/* ================================================= */
/* REMPLIR LE FORMULAIRE POUR UNE MODIFICATION      */
/* ================================================= */

if (
    indexModification !== null &&
    reservationAModifier
) {

    const champNomModification =
        document.getElementById("nom");

    const champEspaceModification =
        document.getElementById("espace");

    const champDateModification =
        document.getElementById("date");

    const champHeureModification =
        document.getElementById("heure");


    if (champNomModification) {

        champNomModification.value =
            reservationAModifier.nom;

    }


    if (champEspaceModification) {

        champEspaceModification.value =
            reservationAModifier.espace;

    }


    if (champDateModification) {

        champDateModification.value =
            reservationAModifier.date;

    }


    if (champHeureModification) {

        champHeureModification.value =
            reservationAModifier.heure;

    }


    /* Mise à jour du compteur du nom */

    if (
        champNomModification &&
        compteurNom
    ) {

        compteurNom.textContent =
            champNomModification.value.length +
            " / 30 caractères";

    }

}


/* ================================================= */
/* AFFICHER LES RÉSERVATIONS                         */
/* ================================================= */

function afficherReservations() {

    if (!listeReservations) {

        return;

    }


    listeReservations.innerHTML = "";


    /* ============================================= */
    /* AUCUNE RÉSERVATION                            */
    /* ÉTAPE 76                                      */
    /* ============================================= */

    if (reservations.length === 0) {

        listeReservations.innerHTML = `
            <tr>
                <td colspan="6">
                    📭 Aucune réservation pour le moment.
                </td>
            </tr>
        `;

        return;

    }


    /* ============================================= */
    /* AFFICHAGE DE CHAQUE RÉSERVATION               */
    /* ============================================= */

    reservations.forEach(
        function(reservation, index) {

            const ligne =
                document.createElement("tr");


            /* ===================================== */
            /* ÉTAPE 73 : DATE FRANÇAISE             */
            /* ===================================== */

            const dateFrancaise =
                reservation.date
                    .split("-")
                    .reverse()
                    .join("/");


            /* ===================================== */
            /* ÉTAPE 74 : AFFICHER LE NOM             */
            /* ===================================== */

            ligne.innerHTML = `

                <td>
                    👤 ${reservation.nom}
                </td>

                <td>
                    📅 ${dateFrancaise}
                </td>

                <td>
                    🕐 ${reservation.heure}
                </td>

                <td>
                    🏢 ${reservation.espace}
                </td>

                <td>
                    <span class="badge-confirme">
                        ✅ Confirmée
                    </span>
                </td>

                <td>
                    <button
                        class="annuler"
                        type="button">
                        ❌ Annuler
                    </button>
                </td>

            `;


            listeReservations.appendChild(
                ligne
            );


            /* ===================================== */
            /* BOUTON ANNULER                         */
            /* ÉTAPE 77                                */
            /* ===================================== */

            const boutonAnnuler =
                ligne.querySelector(
                    ".annuler"
                );


            if (boutonAnnuler) {

                boutonAnnuler.addEventListener(
                    "click",
                    function() {

                        const confirmation =
                            confirm(
                                "Voulez-vous vraiment annuler cette réservation ?"
                            );


                        if (confirmation) {

                            reservations.splice(
                                index,
                                1
                            );


                            localStorage.setItem(
                                "reservations",
                                JSON.stringify(
                                    reservations
                                )
                            );


                            afficherReservations();

                            mettreAJourCompteur();


                            alert(
                                "✅ Réservation annulée."
                            );

                        }

                    }
                );

            }

        }
    );

}


/* ================================================= */
/* COMPTEUR DES RÉSERVATIONS                         */
/* ================================================= */

function mettreAJourCompteur() {

    const compteur =
        document.getElementById(
            "nombreReservations"
        );


    if (compteur) {

        compteur.textContent =
            reservations.length;

    }

}


/* ================================================= */
/* FORMULAIRE DE RÉSERVATION                         */
/* ================================================= */

if (formulaire) {

    formulaire.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /* ===================================== */
            /* RÉCUPÉRATION DES INFORMATIONS          */
            /* ===================================== */

            const nom =
                document
                    .getElementById("nom")
                    .value
                    .trim();


            const espace =
                document
                    .getElementById("espace")
                    .value;


            const date =
                document
                    .getElementById("date")
                    .value;


            const heure =
                document
                    .getElementById("heure")
                    .value;


            /* ===================================== */
            /* ÉTAPE 70 : NOM VALIDE                  */
            /* ===================================== */

            if (nom.length < 2) {

                alert(
                    "❌ Veuillez entrer un nom valide."
                );

                return;

            }


            /* ===================================== */
            /* ÉTAPE 82 : PAS DE CHIFFRES             */
            /* ===================================== */

            const nomValide =
                /^[A-Za-zÀ-ÿ\s'-]+$/;


            if (!nomValide.test(nom)) {

                alert(
                    "❌ Le nom ne doit pas contenir de chiffres."
                );

                return;

            }


            /* ===================================== */
            /* ÉTAPE 83 : MAXIMUM 30 CARACTÈRES       */
            /* ===================================== */

            if (nom.length > 30) {

                alert(
                    "❌ Le nom est trop long. Maximum 30 caractères."
                );

                return;

            }


            /* ===================================== */
            /* ESPACE OBLIGATOIRE                     */
            /* ===================================== */

            if (espace === "") {

                alert(
                    "❌ Veuillez choisir un espace."
                );

                return;

            }


            /* ===================================== */
            /* DATE OBLIGATOIRE                       */
            /* ===================================== */

            if (date === "") {

                alert(
                    "❌ Veuillez choisir une date."
                );

                return;

            }


            /* ===================================== */
            /* ÉTAPE 81 : DATE PASSÉE                 */
            /* ===================================== */

            if (date < dateAujourdHui) {

                alert(
                    "❌ Vous ne pouvez pas réserver une date passée."
                );

                return;

            }


            /* ===================================== */
            /* HEURE OBLIGATOIRE                      */
            /* ===================================== */

            if (heure === "") {

                alert(
                    "❌ Veuillez choisir une heure."
                );

                return;

            }


            /* ===================================== */
            /* ÉTAPE 71 : DIMANCHE FERMÉ             */
            /* ===================================== */

            const dateChoisie =
                new Date(
                    date + "T00:00:00"
                );


            if (
                dateChoisie.getDay() === 0
            ) {

                alert(
                    "❌ Le coworking est fermé le dimanche."
                );

                return;

            }


            /* ===================================== */
            /* ÉTAPE 72 : HORAIRES AUTORISÉS         */
            /* ===================================== */

            const heuresAutorisees = [

                "09:00 - 11:00",

                "11:00 - 13:00",

                "14:00 - 16:00",

                "16:00 - 18:00"

            ];


            if (
                !heuresAutorisees.includes(
                    heure
                )
            ) {

                alert(
                    "❌ Veuillez choisir un horaire disponible."
                );

                return;

            }


            /* ===================================== */
            /* ÉTAPE 69 : EMPÊCHER LES DOUBLONS       */
            /* ===================================== */

            const doublon =
                reservations.some(
                    function(
                        reservation,
                        index
                    ) {


                        /* Lors d'une modification,
                           on ignore la réservation
                           que l'on est en train
                           de modifier. */

                        if (
                            indexModification !== null &&
                            index ===
                                Number(
                                    indexModification
                                )
                        ) {

                            return false;

                        }


                        return (

                            reservation.espace ===
                            espace

                            &&

                            reservation.date ===
                            date

                            &&

                            reservation.heure ===
                            heure

                        );

                    }
                );


            if (doublon) {

                alert(
                    "❌ Cet espace est déjà réservé à cette date et cette heure."
                );

                return;

            }


            /* ===================================== */
            /* CRÉATION DE LA RÉSERVATION             */
            /* ===================================== */

            const nouvelleReservation = {

                nom: nom,

                espace: espace,

                date: date,

                heure: heure

            };


            /* ===================================== */
            /* MODIFICATION                           */
            /* ÉTAPE 78                                */
            /* ===================================== */

            if (
                indexModification !== null
            ) {

                reservations[
                    Number(indexModification)
                ] =
                    nouvelleReservation;


                localStorage.setItem(
                    "reservations",
                    JSON.stringify(
                        reservations
                    )
                );


                localStorage.removeItem(
                    "indexReservation"
                );


                localStorage.removeItem(
                    "reservationAModifier"
                );


                alert(
                    "✅ Réservation modifiée !"
                );

            }


            /* ===================================== */
            /* NOUVELLE RÉSERVATION                    */
            /* ===================================== */

            else {

                reservations.push(
                    nouvelleReservation
                );


                localStorage.setItem(
                    "reservations",
                    JSON.stringify(
                        reservations
                    )
                );


                alert(
                    "✅ Réservation enregistrée !"
                );

            }


            /* ===================================== */
            /* MISE À JOUR                             */
            /* ===================================== */

            afficherReservations();

            mettreAJourCompteur();


            /* ===================================== */
            /* PAGE DE CONFIRMATION                   */
            /* ===================================== */

            window.location.href =
                "confirmation.html";

        }
    );

}


/* ================================================= */
/* DÉMARRAGE                                         */
/* ================================================= */

afficherReservations();

mettreAJourCompteur();


/* ================================================= */
/* FIN DU SCRIPT.JS                                  */
/* ================================================= */