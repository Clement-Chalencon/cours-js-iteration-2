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
                type = data.objects[key].type;
                $('#modSerial').text(`Numéro de série : ${serial}`);
                $('#modType').text(` Type : ${type} `);
                $('#modImg .imgType').attr('src', `/static/images/${data.objects[key].image}`);         
                if (data.objects[key].status) {
                    $('#modStatus').text(` Connectay `);
                    $('#modStatus').removeClass().addClass('text-center card-body text-white bg-success');
                }
                else {
                    $('#modStatus').text(` Déconnecté `);
                    $('#modStatus').removeClass().addClass('text-center card-body text-white bg-danger')
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
                $('td:contains(' + serial + ')').next().children().attr('src', '/static/images/' + img, 'alt', 'image_par_defaut');
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