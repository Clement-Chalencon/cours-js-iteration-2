/**
 * Fonction à appeler au chargement de la page
 * Cette fonction devra exécuter les actions suivantes :
 *    - charger la liste des objets depuis l'API
 *    - charger les données des objets dans la table
 */
let data_object = {
    "serial": "OBJ_004",
    "type": "raspberry_TH",
    "image": "raspberry-pi-4.jpg",
    "description": "Capteur de température et d'humidité de la salle de cours du Campus d'Annecy",
    "location": "45.907998, 6.102729",
    "refresh": 5,
    "status": true,
    "provisionning": {
        "date": "2020-03-20",
        "operator": "JPA"
    }
}


load_default_image("raspberry_TH","OBJ_001");
load_components();

function load_components() {
    $.get("/data", function (data) {
        for (let key of data.objects) {
            add_line_to_table(key);
        }
    });

}

function load_default_image(type,serial) {
    let img;
    $.get("/data",function (data) {
        for (let key in data.types) {
            if (key == type) {
                img = data.types[key].default_image;
                console.log('type : ' + type + 'serial : ' + serial);
                $('td:contains('+serial+')').next().children().attr('src', '/static/images/'+img, 'alt','image_par_defaut');

            }
        }
    });
}

function add_line_to_table(data) {
    let image;
    image = data.image;
    if (data["image"] == undefined) {
        load_default_image(data.type, data.serial);
    }
    let line = `
    <tr>
        <td>`+ data.serial + `</td>
        <td><img class="imgType" src="/static/images/`+ image + `"></td>
        <td>`+ data.description + `</td>
        <td><div class="form-check">
            <input class="form-check-input" type="checkbox" value="`+ data.status + `" id="defaultCheck1">
            <label class="form-check-label" for="defaultCheck1">
                checkbox
            </label></td>
    <td><button type="button" class="btn btn-info">détail</button></td>
    </tr>`
    document.getElementById('table_body').innerHTML += line;
    // document.getElementById('table_body').innerHTML(line);
}