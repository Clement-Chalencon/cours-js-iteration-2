function get_full_object_by_serial(serial) {
    let obj = data.objects;
    let type = data.types;
    let format = data.data_formats;
    let objFinal = {}
    let res = {};
    let objJS = {}
    // let objFinal = {}
    for (let key in obj) {
        if (obj[key].serial === "OBJ_001") { // "OBJ_001" serial
            // console.log(key);
            for (key2 in type) {
                if (obj[key].type == key2) {
                    for (key3 in format) {
                        for (var i = 0; i < type[key2].sensors.length; i++) {
                            if (type[key2].sensors[i] == key3) {
                                objJS[type[key2].sensors[i]] = format[key3];
                                // objFinal[obj[key].serial] = obj[key];
                                // console.log(objFinal);
                                // res.push(objFinal);   
                                var exist = false;
                                for (var e in res) {
                                    if (res[e] == obj[key]) {
                                        exist = true;
                                        console.log('existe déja');
                                    }
                                }
                                if (!exist) {
                                    console.log('existe pas');
                                    obj[key]["default_image"] = type[key2].default_image;
                                    obj[key]["communication"] = type[key2].communication;
                                    obj[key]["sensors"] = objJS;
                                    objFinal = obj[key];
                                    // console.log(obj[key]);
                                    // res.push(obj[key]);
                                    // console.log('ajoute 1');
                                    res.push(1);
                                }
                            }
                        }
                    }

                }
            }
        }
    }
    // console.log(objFinal);
    if (res.length == 0) {
        // console.log('res vide');
        return undefined;
    }
    return objFinal;
}