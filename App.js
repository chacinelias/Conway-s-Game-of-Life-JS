let grid = [];
let rows = 10;
let cols = 10;
let initial_prob = 0.7;
let live_cells = 0;

$(document).ready(function () {
    let cell = "<div class=\"cell\" onclick=\"handleClick()\"/>";

    for (let i = 0; i < rows*cols; i++) {
        let rand = Math.random() >= initial_prob ? true : false;
        let newCell = cellMaker({id: i, status: rand, color: (rand ? 'gray' : 'white') });

        $("#wrapper").append($(cell).clone().attr('id', newCell.id).css('background-color', newCell.color));
        grid[i] = newCell;
        if(newCell.status) live_cells++;
    }

    console.log(live_cells);
});

$(document).ready(function(){
    $("#score-board").html("Live Cells: " + live_cells);
})

function handleClick(){
    $(document).click(function(e) {
        death(e.target.id);
    });
}

function death(cell_id){
    $('#' + cell_id).css('background-color', 'white');
    live_cells--;
    console.log(live_cells);
}

//cell factory
const cellMaker = ({id, status, color}) => ({
    id,
    status,
    color,
    neighbors: null
})
