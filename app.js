/**
 * Bienvenu du coté serveur de javascript les fonctions ci-dessous
 * devront être complétées pour passer les tests et permettre au
 * client web (front-end) d'accéder à des données.
 */

/**
 * import de la bibliothèque fs et lecture du fichier data.json.
 */
const fs = require('fs');
const rawfile = fs.readFileSync('data/data.json');
let data = JSON.parse(rawfile);


/**
 * Cette fonction est lancée au démarrage du serveur
 * elle ne prend pas de paramètres et retourne
 * une chaîne de caractères.
 */
function demarrage() {
    return "something";
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:500np0/ représentée par la route '/'.
 * Elle ne prend pas de paramètres 
 * Elle retourne un objet javascript au format json.
 */
function home() {
    let jsHero = {
        "name": "Batman",
        "homeTown": "Gotham",
        "secretBase": "BatCave",
    }
    return jsHero;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/data représentée par la route '/data'.
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant toutes les données.
 */
function donnees() {
    return data;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/comms représentée par la route '/comms'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * de tous les modes de communications de la base de données.
 * Cette liste sera contenu dans la clé communication
 */
function comms() {

    return { "communication": data.communication };

}


/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects représentée par la route '/objects'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * de tous les objets de la base de données.
 * Cette liste sera contenue dans la clé objects
 */
function objects() {
    return { "objects": data.objects };
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/types représentée par la route '/types'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * des types existant et leur détail dans la base de données.
 * Cette liste sera contenu dans la clé types
 */
function types() {
    let tab = [];
    for (let prop in data.types) {
        tab.push(data.types[prop]);
    }
    // console.log(tab)
    return { 'types': tab };
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/formats représentée par la route '/formats'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * des formats de donnnées existant et leur détail dans la base de données.
 * Cette liste sera contenu dans la clé formats.
 */
function formats() {
    let formats = data.data_formats;
    let result = [];
    for (let format in formats) {
        result.push(formats[format]);
    }
    // console.log(result);
    return { "formats": result };
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/serials représentée par la route '/objects/serials'
 * Elle ne prend pas de paramètres.
 * Elle retourne un objet javascript contenant une liste
 * de tous les numéros de série des objets de la base de données.
 * Cette liste sera contenue dans la clé objects
 */
function objects_serials() {
    let result = [];
    for (let val in data.objects) {
        // console.log(val);
        result.push(data.objects[val].serial);
    }

    // console.log({ "objects": result });
    return { "objects": result };
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/object/serial/<serial> représentée par la route '/object/serial/:serial'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant seulement
 * l'objet ayant le serial passé en paramètre.
 */
function get_object_by_serial(serial) {
    let obj = data.objects;
    let res;
    for (let val in obj) {
        if (obj[val].serial == serial) {
            res = obj[val];
        }
    }
    return res;
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/operator/<operator> représentée par la route '/objects/operator/:operator'
 * Elle prend l'opérateur de l'objet en paramètre.
 * Elle retourne un objet javascript contenant une
 * liste des objets ayant l'opérateur passé en paramètre.
 */
function get_objects_by_operator(operator) {
    let obj = data.objects;
    let res = [];
    for (let val in obj) {
        // console.log(operator);
        if (obj[val].provisionning.operator === operator) {
            res.push(obj[val]);
        }
    }
    if (res.length === 0) {
        return undefined;
    }
    return { "objects": res };
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/types/comm/<comm> représentée par la route '/types/comm/:comm'
 * Elle prend mode de communication de l'objet en paramètre.
 * Elle retourne un objet javascript contenant une liste de types
 * ayant pour mode de communication celui passé en paramètre.
 */
function get_types_by_comm(comm) {
    let type = data.types;
    let res = [];
    for (let val in type) {
        if (type[val].communication === comm) {
            res.push(type[val]);
        }
    }
    if (res.length === 0) {
        return undefined;
    }
    return { "types": res };

}


/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/types/format/<format> représentée par la route '/types/format/:format'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant une liste de types
 * ayant pour un format de données celui passé en paramètre.
 */
function get_types_by_format(format) {
    let type = data.types;
    let res = [];
    for (let val1 in type) {
        for (let val2 in type[val1].sensors) {
            if (type[val1].sensors[val2] == format) {
                res.push(type[val1]);
            }
        }
    }
    if (res.length === 0) {
        return undefined;
    }
    return { "types": res };
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/comm/<comm> représentée par la route '/objects/comm/:comm'
 * Elle prend le mode de communication de l'objet en paramètre.
 * Elle retourne un objet javascript contenant une liste d'objets
 * ayant pour mode de communication celui passé en paramètre.
 */
function filter_objects_by_comm(comm) {
    let obj = data.objects;
    let type = data.types;
    let res = [];
    for (let key in type) {
        // console.log('1ere boucle' + key);
        if (type[key].communication === comm) { //"wifi" comm
            // console.log('1ere condition' + key);
            for (let key2 in obj) {
                // console.log('2eme boucle' + obj[key2].type);
                if (obj[key2].type === key) {
                    // console.log('2eme condition ' + obj[key2].type +' = ' + key);
                    res.push(type[key2]);
                }
            }
        }
    }

    if (res.length === 0) {
        // console.log('res vide');
        return undefined;
    }
    return { "objects": res };

}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/objects/data_type/<data_type> représentée par la route '/objects/data_type/:data_type'
 * Elle prend le type de donnée renvoyer par un objet en paramètre.
 * Elle retourne un objet javascript contenant une liste d'objets
 * comprenant les noms des capteurs émettant des données
 * du même type que celui passé en paramètre.
 */
function filter_objects_by_data_type(data_type) {
    let obj = data.objects;
    let type = data.types;
    let format = data.data_formats;
    let res = [];
    for (let key in format) {
        // console.log(format[key].data_type);
        // console.log(key);
        if (format[key].data_type === data_type) { //"boolean"
            // console.log(key);
            for (let key2 in type) {
                for (let key3 in type[key2].sensors) {
                    if (type[key2].sensors[key3] == key) {
                        // console.log(type[key2].sensors[key3] + ' ==  ' + key);
                        // console.log(key2);
                        for (let key4 in obj) {
                            // console.log('2eme boucle' + obj[key2].type);
                            if (obj[key4].type === key2) {
                                let exist = false;
                                for (let e in res) {
                                    if (res[e] == obj[key4]) {
                                        exist = true;
                                    }
                                }
                                if (!exist) {
                                    // console.log('3eme condition ' + obj[key4].type +' = ' + key2)
                                    // console.log(key4);
                                    obj[key4]["sensors"] = type[key2].sensors;
                                    res.push(obj[key4]);
                                }
                            }
                        }
                    }
                }
            }

        }
    }
    // console.log(res);
    if (res.length == 0) {
        // console.log('res vide');
        return undefined;
    }
    return { "objects": res };
}

/**
 * Cette fonction est exécutée lorsqu'on demande l'adresse
 * http://localhost:5000/object/full/<serial> représentée par la route '/object/full/:serial'
 * Elle prend le serial de l'objet en paramètre.
 * Elle retourne un objet javascript contenant seulement
 * l'objet ayant le serial passé en paramètre comprenant toutes les informations possible sur cet objet.
 * Les types de données des sensors et autres informations seront regroupé dans la clé sensors de l'objet.
 */
function get_full_object_by_serial(serial) {

    let type = data.types;
    let format = data.data_formats;
    let objFinal = {};
    let objSensors = {};

    if (!isEmpty(get_object_by_serial("serial"))); {

        // récupération des données de l'objet avec le sérial
        objFinal = get_object_by_serial("serial"); // "OBJ_003"

        // ajout des attributs default_image et communication
        for (let keyType in type) {
            if (objFinal.type == keyType) {
                objFinal["default_image"] = type[keyType].default_image;
                objFinal["communication"] = type[keyType].communication;
            }
        }

        //ajouts des formats pour les sensors
        for (let keySensors in objFinal["sensors"]) {
            for (let keyFormat in format) {
                if (objFinal["sensors"][keySensors] == keyFormat) {
                    objSensors[keyFormat] = format[keyFormat];
                }
            }
        }
        objFinal["sensors"] = objSensors;
    }

    if (isEmpty(objFinal)) return undefined;
    
    return objFinal;
}

function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}


/**
 * À partir de ce commentaire ne rien modifier.
 * le serveur est lancé, ses routes sont définies
 * d'autres opérations sont effectuées afin de pouvoir tester le code.
 */

const express = require('express');
const app = express();
app.use(express.static('public'));

// définitions des routes
app.get('/', route(home));
app.get('/data', route(donnees));
app.get('/objects', route(objects));
app.get('/comms', route(comms));
app.get('/types', route(types));
app.get('/formats', route(formats));
app.get('/objects/serials', route(objects_serials));
app.get('/object/serial/:serial', route(get_object_by_serial));
app.get('/object/full/:serial', route(get_full_object_by_serial));
app.get('/objects/operator/:operator', route(get_objects_by_operator));
app.get('/objects/comm/:comm', route(filter_objects_by_comm));
app.get('/objects/data_type/:data_type', route(filter_objects_by_data_type));
app.get('/types/comm/:comm', route(get_types_by_comm));
app.get('/types/format/:format', route(get_types_by_format));


function route(fun) {
    return function (req, res) {
        if (Object.keys(req.params).length !== 0) {
            res.json(fun(Object.values(req.params)[0]));
        }
        return res.send(fun());
    }
}



const port = process.argv[2] == "-u" ? 5001 : process.argv[2];
app.listen(port, function () {
    console.log(demarrage());
});

module.exports = {
    "demarrage": demarrage,
    "home": home,
    "donnees": donnees,
    "objects": objects,
    "types": types,
    "formats": formats,
    "objects_serials": objects_serials,
    "get_object_by_serial": get_object_by_serial,
    "get_full_object_by_serial": get_full_object_by_serial,
    "get_objects_by_operator": get_objects_by_operator,
    "filter_objects_by_comm": filter_objects_by_comm,
    "filter_objects_by_data_type": filter_objects_by_data_type,
    "get_types_by_comm": get_types_by_comm,
    "get_types_by_format": get_types_by_format,
    "comms": comms
};