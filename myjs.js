//Make the DIV element draggagle:
function dragElement(elmnt) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (elmnt) {
        /* if present, the header is where you move the DIV from:*/
        elmnt.onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function w3_open() {
    document.getElementById("mySidebar").style.display = "block";
    document.getElementById("mySidebar1").style.display = "block";
}

function w3_close() {
    document.getElementById("mySidebar").style.display = "none";
    document.getElementById("mySidebar1").style.display = "none";
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

var nodeNum = 0;

function create(n, pos = "relative") {
    let x = document.getElementById("tag").value;
    let node = document.createElement(x);
    let value = document.getElementById("nodevalue").value;
    node.append(value);
    node.style.cursor = "move";
    node.style.position = pos;
    node.setAttribute("draggable", "true");
    node.setAttribute("ondragstart", "drag(event)");
    node.setAttribute("ondrop", "drop(event)");
    node.setAttribute("ondragover", "allowDrop(event)");
    //node.setAttribute("onmouseover", "dragElement(this)");
    node.setAttribute("id", "node" + nodeNum);
    nodeNum++;
    node.setAttribute("class", "node w3-padding w3-white");
    node.setAttribute('data-long-press-delay', '500');
    document.getElementById(n).append(node);
}

window.oncontextmenu = function () {
    return false;
}

let as = document.getElementById('result');
//element selection
as.addEventListener("click", selectElement);

as.addEventListener('long-press', function(elm){
    event.preventDefault();
    e = document.getElementById(event.target.id);
    document.getElementById('advance').style.display = "block";
});

function selectElement(event) {
    if (event.ctrlKey) {
        event.preventDefault();
        e = document.getElementById(event.target.id);
        e.style.border = "3px dotted red";
        document.getElementById('advance').style.display = "block";
    }
    e.addEventListener("mouseover", function () {
        e.style.filter = "invert(100%)";
    });

    e.addEventListener("mouseleave", function () {
        e.style.filter = "invert(0%)";
    });
    //deselect button
    let addBtn = document.getElementById('addBtn');
    addBtn.style.display = "inline";
    addBtn.addEventListener("click", function () {
        addBtn.style.display = "none";
        e.style.border = "none";
        document.getElementById('advance').style.display = "none";
        e = 'undefined';
    });

    //delete button

    let del = document.getElementById('del');
    del.addEventListener("click", function () {
        e.remove();
        e = 'undefined';
        addBtn.style.display = "none";
        document.getElementById('advance').style.display = "none";
    })
    //properties
    let properties = document.getElementById("properties");
    properties.addEventListener("click", function () {
        document.getElementById("propContainer").style.display = "block";
        document.getElementById("elemHeight").innerHTML = e.offsetHeight-6 + "px";
        document.getElementById("elemWidth").innerHTML = e.offsetWidth-6 + "px";
        document.getElementById("elemClass").innerHTML = e.getAttribute('class');
        document.getElementById("elemId").innerHTML = e.getAttribute('id');
        document.getElementById("elemCss").innerHTML = e.getAttribute('style');
        if(e.hasAttribute('src')){
        document.getElementById("elemSrc").innerHTML = e.getAttribute('src');
        }
        if(e.hasAttribute('href')){
        document.getElementById("elemSrc").innerHTML = e.getAttribute('href');
        }
    })
    
    // style
    let edit = document.getElementById("edit");
    edit.addEventListener("click", function () {

        document.getElementById('editOption').style.display = "block";

        let elemStyle = document.getElementById("elemStyle");

        elemStyle.addEventListener("focus", function () {
            if (elemStyle.value == "") {
                elemStyle.value = e.getAttribute("style");
            }
        })

        elemStyle.addEventListener("input", function () {
            e.setAttribute("style", elemStyle.value);
        })

    })

    //attributes
    let attribute = document.getElementById("attributes");
    attribute.addEventListener("click", function () {
        document.getElementById('model').style.display = "block";
        document.getElementById('modify').addEventListener("click", function () {
            let attrib = document.getElementById("attrib");
            let val = document.getElementById("val");
            e.setAttribute(attrib.value, val.value);
            document.getElementById('model').style.display = "none";
        })
    })
}
//innerHTML

let elemText = document.getElementById("nodevalue");
elemText.addEventListener("input", function () {
    e.innerHTML = elemText.value;
    if (elemText.value.length > 24) {
        elemText.rows = 5;
    } else {
        elemText.rows = 1;
    }
})

//w3-class
let w3button = document.querySelector('#w3class');
w3button.addEventListener('click', function (btn) {
    e.classList.toggle(btn.target.innerHTML);
})

//width

let elemWidth = document.getElementById('width');
elemWidth.addEventListener("input", function () {
    e.style.width = elemWidth.value;
})

//height

let elemHeight = document.getElementById('height');
elemHeight.addEventListener("input", function () {
    e.style.height = elemHeight.value;
})

// Border

var bdr = document.getElementById("bdr");

bdr.addEventListener("change",
    function () {
        var bdrwidth = document.getElementById("bdrwidth").value;
        var bdrstyl = document.getElementById("bdrstyl").value;
        var bdrclr = document.getElementById("bdrclr").value;
        if (bdr.checked == true) {
            e.style.border = bdrwidth + " " + bdrstyl + " " + bdrclr;
            bl.style.display = "none";
            br.style.display = "none";
            bt.style.display = "none";
            bb.style.display = "none";
        } else {
            e.style.border = "none";
            bl.style.display = "inline";
            br.style.display = "inline";
            bt.style.display = "inline";
            bb.style.display = "inline";
        }
    });

var bl = document.getElementById("bdrlft");
bl.addEventListener("change",
    function () {
        var bdrwidth = document.getElementById("bdrwidth").value;
        var bdrstyl = document.getElementById("bdrstyl").value;
        var bdrclr = document.getElementById("bdrclr").value;
        if (bdrlft.checked == true) {
            e.style.borderLeft = bdrwidth + " " + bdrstyl + " " + bdrclr;

        } else {
            e.style.borderLeft = "none";
        }
    });

var br = document.getElementById("bdrrgt");
br.addEventListener("change",
    function () {
        var bdrwidth = document.getElementById("bdrwidth").value;
        var bdrstyl = document.getElementById("bdrstyl").value;
        var bdrclr = document.getElementById("bdrclr").value;
        if (bdrrgt.checked == true) {
            e.style.borderRight = bdrwidth + " " + bdrstyl + " " + bdrclr;
        } else {
            e.style.borderRight = "none";
        }
    });

var bt = document.getElementById("bdrtop");
bt.addEventListener("change",
    function () {
        var bdrwidth = document.getElementById("bdrwidth").value;
        var bdrstyl = document.getElementById("bdrstyl").value;
        var bdrclr = document.getElementById("bdrclr").value;
        if (bdrtop.checked == true) {
            e.style.borderTop = bdrwidth + " " + bdrstyl + " " + bdrclr;
        } else {
            e.style.borderTop = "none";
        }
    });

var bb = document.getElementById("bdrbtm");
bb.addEventListener("change",
    function () {
        var bdrwidth = document.getElementById("bdrwidth").value;
        var bdrstyl = document.getElementById("bdrstyl").value;
        var bdrclr = document.getElementById("bdrclr").value;
        if (bdrbtm.checked == true) {
            e.style.borderBottom = bdrwidth + " " + bdrstyl + " " + bdrclr;
        } else {
            e.style.borderBottom = "none";
        }
    });


// Padding

var pad = document.getElementById("pad");
var padlft = document.getElementById("padlft");
var padrgt = document.getElementById("padrgt");
var padtop = document.getElementById("padtop");
var padbtm = document.getElementById("padbtm");

pad.addEventListener("change", function () {
    var padwidth = document.getElementById("padwidth").value;
    if (pad.checked == true) {
        e.style.padding = padwidth;
    } else {
        e.style.padding = 0;
    }
});

padlft.addEventListener("change", function () {
    var padwidth = document.getElementById("padwidth").value;
    if (padlft.checked == true) {
        e.style.paddingLeft = padwidth;
    } else {
        e.style.paddingLeft = 0;
    }
});

padrgt.addEventListener("change", function () {
    var padwidth = document.getElementById("padwidth").value;
    if (padrgt.checked == true) {
        e.style.paddingRight = padwidth;
    } else {
        e.style.paddingRight = 0;
    }
});

padtop.addEventListener("change", function () {
    var padwidth = document.getElementById("padwidth").value;
    if (padtop.checked == true) {
        e.style.paddingTop = padwidth;
    } else {
        e.style.paddingTop = 0;
    }
});

padbtm.addEventListener("change", function () {
    var padwidth = document.getElementById("padwidth").value;
    if (padbtm.checked == true) {
        e.style.paddingBottom = padwidth;
    } else {
        e.style.paddingBottom = 0;
    }
});

var txtclr = document.getElementById("txtclr");
var backclr = document.getElementById("backclr");

txtclr.addEventListener("change", function () {
    e.style.color = txtclr.value;
});

backclr.addEventListener("change", function () {
    e.style.backgroundColor = backclr.value;
});