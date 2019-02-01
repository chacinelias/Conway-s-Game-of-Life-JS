var grid = [];
let status;
var rows = 10;
var cols = 10;

$(document).ready(function () {
    var cell = "<div class=\"cell\" onclick=\"handleClick()\"/>"

    for (let i = 0; i < rows*cols; i++) {
        let color = Math.random() >= 0.7 ? 'gray': 'white';
        let new_cell = $(cell).clone().attr('id', i).css('background-color', color);

        $("#wrapper").append(new_cell);

        status = color == 'gray' ? true : false;
        // console.log($(new_cell).attr('id') +' '+ status);
    }   

});

function handleClick(){
    $(document).click(function(e) {
        console.log(e.target.id);
        lifeAndDeath(e.target.id);
    });
}

function lifeAndDeath(cell_id){
    $('#' + cell_id).css('background-color', 'white');

}


/*below is the factory function for creating cell objects.
cell objects make it easier to keep track of live and dead cells*/

let cellMaker = {
    status: null,
    color: this.status == true ? 'gray' : 'white',
    neighbors: null
};

let a = cellMaker;

a.status = true;
a.neighbors = 3;

console.log(a);