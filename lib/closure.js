/*jshint devel:true, unused:false */
function unusedFunction(note) {
    alert(note['text']);
}

function displayNoteTitle(note) {
    alert(note['title']);
}

var flowerNote = {};
flowerNote['title'] = 'Flowers';
displayNoteTitle(flowerNote);
