//
// ─── SCRIPT JQUERY ──────────────────────────────────────────────────────────────────
//
$(document).ready(function () {
    load_components();
});

function load_modal(serial) { 
    $.get("/data", function (data) {
        let type;
        for (let key in data.objects) {
            if (data.objects[key].serial == serial) {
                // Insertion en Vanilla
                type = data.objects[key].type;
                let tabOfcards = document.getElementById('modalContent').childNodes[3];
                tabOfcards.childNodes[1].childNodes[3].childNodes[1].textContent = ` Numéro de série : ${serial} `;
                tabOfcards.childNodes[1].childNodes[5].childNodes[1].textContent = ` Type : ${type} `;
                tabOfcards.childNodes[1].childNodes[7].childNodes[1].childNodes[1].attributes[1].value = `/static/images/${data.objects[key].image}`;
                if (data.objects[key].status) {
                    tabOfcards.childNodes[1].childNodes[9].childNodes[1].textContent = ` Connectay `;
                    tabOfcards.childNodes[1].childNodes[9].attributes[0].nodeValue = "card text-white bg-success";
                }
                else {
                    tabOfcards.childNodes[1].childNodes[9].childNodes[1].textContent = ` Déconnecté `;
                    tabOfcards.childNodes[1].childNodes[9].attributes[0].nodeValue = "card text-white bg-danger";
                }

                // insertion de la map
                let locs = data.objects[key].location.split(', ');
                console.log(locs[0], locs[1]);
                let mymap = L.map('mapid').setView([locs[0], locs[1]], 13);
                L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    maxZoom: 50,
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1,
                    accessToken: 'pk.eyJ1IjoiYnV0dGVyczczIiwiYSI6ImNrOGZxNXU0azAyd2QzbHBrazgyejUydDQifQ.KI60BPzP9wR5w4-L_B0YKw'
                }).addTo(mymap);
            }
        }

        // insertion de données en JQUERY
        $('#modalContent .row .col-sm-4:nth-child(2) div').html("");
        for (let key in data.types) {
            if (key == type) {
                $.each(data.types[key]['sensors'], function (index, value) {
                    $('#modalContent .row .col-sm-4:nth-child(2)').append(`
                    <div class="card">
                        <div class="card-body" id="${value + serial}">
                            <ul> <b>${value}</b>
                            </ul>
                        </div>
                    </div>`)
                    // for (let n in data.data_formats) {
                    //     if (n == value) {
                    //         for (let i in data.data_formats[n]) {
                    //             console(log)
                    //             console.log(i);
                    //             $(`#${value + serial} ul`).append(`
                    //             <li>Type : ${data.data_formats[n]["data_type"]}</li>
                    //             <li>Unité : ${data.data_formats[n]["unit"]}</li>
                    //             `)
                    //         }
                    //     }
                    // }
                });
            }
        }
    });
}

function load_components() {
    $.get("/objects", function (data) {
        $.each(data.objects, function (key, value) {
            add_line_to_table(value);
        });
    });
}

// ajout de l'image par défaut
function load_default_image(type, serial) {
    let img;
    $.get("/data", function (data) {
        for (let key in data.types) {
            if (key == type) {
                img = data.types[key].default_image;

                // solution Jquery
                $('td:contains(' + serial + ')').next().children().attr('src', '/static/images/' + img, 'alt', 'image_par_defaut');

                // solution vanilla Clem
                // let tabOfTd = document.getElementById('table_body').children;
                // for (let i = 0; i < (tabOfTd.length - 1); i++) { //obligé de passer par un compteur pour faire sauter le dernier enfant de table_body qui ne contient rien
                //     if (tabOfTd[i].children[0].textContent == serial) {
                //         tabOfTd[i].children[1].innerHTML = `<img class="imgType" id="img` + data.serial + `" src="/static/images/` + img + `">`;
                //     }
                // }

            }
        }
    });
}


// Ajout des lignes dans le tableau
function add_line_to_table(data) {
    let image = data.image;
    if (data["image"] == undefined) load_default_image(data.type, data.serial);
    let line = `
    <tr class="object_line">
        <td class="serial_number">${data.serial}</td>
        <td id="img${data.serial}"><img class="imgType" src="/static/images/${image}"></td>
        <td>${data.description}</td>
        <td><div class="form-check">
            <input class="form-check-input" type="checkbox"
            value="${data.status}" id="defaultCheck${data.serial}" ${(data.status) ? "checked" : ""}>
            <label class="form-check-label" for="defaultCheck1">
                Status
            </label></td>
        <td>
            <div class="content">
                <input type="button" class="btn btn-info detBtn" value="Détail" id="btn${data.serial}" data-toggle="modal" data-target="#modal-details" onclick="load_modal(this.parentElement.parentElement.parentElement.childNodes[1].textContent)">
            </div>
        </td>
        </tr>`;
    $("#table_body").append(line);
}