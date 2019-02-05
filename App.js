let grid = [];
let prev_grid = [];

const rows = 10;
const cols = 10;
const initial_prob = 0;
let live_cells = 0;

//creation of cells in grid and display scoreboard
$(document).ready(function () {
    let div_str = '<div class=\"cell\"/>';

    for (let i = 0; i < rows*cols; i++) {
        let rand = Math.random() <= initial_prob ? true : false;
        let newCell = new Cell(i, rand);
        grid.push(newCell);

        $('#wrapper').append($(div_str).clone()
            .attr('id', newCell.id)
            .css('background-color', '#EE7600')
            .css('opacity', newCell.status ? 1 : 0));
        if(newCell.status) live_cells++;
        showScoreboard();
    }

    $('.cell').click(function(e) {
        cell = grid[e.target.id];
        console.log(cell.id);
        if(cell.status){
            cell.death();
            live_cells--;
        }else{
            cell.birth();
            live_cells++;
        }
        showScoreboard();
    } );
});

//spawn generation
function generation(){
    live_cells = 0;


    //TO DO: make DEEP copy of grid array!!! shallow copy won't work
    prev_grid = grid;

    prev_grid.forEach(function(cell){

        let num = cell.getNumLiveNeighbors();
        if(cell.status){
            if(num < 2 || num > 3){
                cell.death();
                live_cells--;
            }
        }else{
            if(num == 3){
                cell.birth();
                live_cells++;
            }
        }
    });
    showScoreboard();
}

//show SCOREBOARD
function showScoreboard(){
    $('#score-board').html('Live Cells:'  + '<span style=color:#EE7600>' + live_cells + '</span>');

}
