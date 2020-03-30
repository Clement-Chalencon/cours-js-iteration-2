//
// ─── SCRIPT JQUERY ──────────────────────────────────────────────────────────────────
//
$(document).ready(function () {
    load_components();
});

function load_modal(serial) {
    $.get("/data", function (data) {
        for (let key in data.objects) {
            if (data.objects[key].serial == serial) {
                let tabofcard = document.getElementsByClassName('modal-body').childNodes;
                
                document.getElementById('modSerial').innerText = `Numero de serie : ${serial}`;
                document.getElementById('modType').innerText = `Type : ${data.objects[key].type}`;
                document.getElementById('modImg').innerHTML = `<img class="imgType" " src="/static/images/${data.objects[key].image}">`;
                let status = "";
                if (data.objects[key].status) {
                    status = "connecté"
                }
                else {
                    status = "déconnecté"
                }
                document.getElementById('modStatus').innerText = ` ${status}`;
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

                // solutions vanilla avec ID
                // document.getElementById('imgOBJ_009').innerHTML=`<img class="imgType" id="img`+ data.serial +`" src="/static/images/`+ img + `">`;
                // document.querySelector('#imgOBJ_009').innerHTML=`<img class="imgType" id="img`+ data.serial +`" src="/static/images/`+ img + `">`;

                // solution vanilla Clem
                // let tabOfTd = document.getElementById('table_body').children;
                // for (let i = 0; i < (tabOfTd.length - 1); i++) { //obligé de passer par un compteur pour faire sauter le dernier enfant de table_body qui ne contient rien
                //     if (tabOfTd[i].children[0].textContent == serial) {
                //         tabOfTd[i].children[1].innerHTML = `<img class="imgType" id="img` + data.serial + `" src="/static/images/` + img + `">`;
                //     }
                // }

                // Solution vanilla Dnis
                // let fullTd = document.getElementsByTagName('td');
                // for(let i = 0; i< fullTd.length; i++){
                //     if (fullTd[i].innerHTML.indexOf(serial) !== -1){
                //         fullTd[i+1].innerHTML= `<img class="imgType" id="img` + serial + `" src="/static/images/` + img + `">`;
                //         break;
                //     }
                // }

                // solution Jean
                // for(const n of document.getElementById('objects_table').childNodes){
                //     if(n.nodeName=='TBODY'){
                //         console.log(n);
                //         for(const c of n.childNodes){
                //             if(c.nodeName == 'TR'){
                //                 if(c.childNodes[1].childNodes[0].textContent == data.serial){
                //                      c.childNodes[3].childNodes[0].setAttribute('src', '/static/images/'+data.default_image);;
                //                 }
                //             }
                //         }
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
            <input class="form-check-input" type="checkbox" value="${data.status}" id="defaultCheck${data.serial}" ${check}>
            <label class="form-check-label" for="defaultCheck1">
                Status
            </label></td>
        <td>
            <div class="content">
                <input type="button" class="btn btn-info detBtn" value="Détail" id="btn${data.serial}" data-toggle="modal" data-target="#modal-details">
            </div>
        </td>
        </tr>`;
    $("#table_body").append(line);
    // document.getElementById('table_body').innerHTML += line;
    $('#btn' + data.serial).on('click', function () {
        console.log(data.serial);
        load_modal(data.serial);
    });
}