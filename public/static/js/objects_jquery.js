//
// ─── SCRIPT JQUERY ──────────────────────────────────────────────────────────────────
//
$(document).ready(function () {
    load_components();
});

function load_modal(serial) {
    console.log(serial);
    $.get("/data", function (data) {
        for (let key in data.objects) {
            if (data.objects[key].serial == serial) {
                
                // Insertion en Vanilla
                let tabOfcards = document.getElementById('modalContent').childNodes[3];
                tabOfcards.childNodes[1].childNodes[3].childNodes[1].textContent=` Numéro de série : ${serial} `;
                tabOfcards.childNodes[1].childNodes[5].childNodes[1].textContent=` Type : ${data.objects[key].type} `;
                tabOfcards.childNodes[1].childNodes[7].childNodes[1].childNodes[1].attributes[1].value=`/static/images/${data.objects[key].image}`;
                if (data.objects[key].status){
                    tabOfcards.childNodes[1].childNodes[9].childNodes[1].textContent=` Connectayyy `;
                    tabOfcards.childNodes[1].childNodes[9].attributes[0].nodeValue="card text-white bg-success";
                }
                else{
                    tabOfcards.childNodes[1].childNodes[9].childNodes[1].textContent=` Déconnecté `;
                    tabOfcards.childNodes[1].childNodes[9].attributes[0].nodeValue="card text-white bg-danger";
                }
                

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



function add_line_to_table(data) {
    let image = data.image;
    let check = '';
    if (data["image"] == undefined) load_default_image(data.type, data.serial);
    if (data.status) check = "checked";
    let line = `
    <tr class="object_line">
        <td class="serial_number">${data.serial}</td>
        <td id="img${data.serial}"><img class="imgType" src="/static/images/${image}"></td>
        <td>${data.description}</td>
        <td><div class="form-check">
            <input class="form-check-input" type="checkbox"
            value="${data.status}" id="defaultCheck${data.serial}" ${check}>
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