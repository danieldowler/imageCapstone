function drop_handler (e) {
    console.log (drop); 
    e.preventDefault ();
    var dt = e.dataTransfer;
    if (dt.items) {
        for (i = 0; i < dt.items; i++) {
            if (dt.items[i].kind == "file") {
                var f = dt.items[i].getAsFile();
                console.log("...file[" + i + "].name = " + f.name)
            }
        }
    }
    else {
        for (var i =0; i < dt.files.length; i++) {
            console.long ("...file[" + i + "].name =" + dt.files[i].name);
        }
    }
}
function dragover_handler(e) {
    console.log("dragOver");
    e.preventDefault();
}
function dragend_handler(e) {
    console.log("dragEnd");
var dt = e.dataTransfer;
if (dt.items) {
for (i = 0; i < dt.items.length; i++) {
    dt.items.remove(i);
}
}
else {
    e.dataTransfer.clearData();
}
}

