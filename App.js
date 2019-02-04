let grid = [];
let rows = 10;
let cols = 10;
let initial_prob = 1;
let live_cells = 0;

//creation of cells in grid and display scoreboard
$(document).ready(function () {
    let div_str = "<div class=\"cell\"/>";

    for (let i = 0; i < rows*cols; i++) {
        let rand = Math.random() >= initial_prob ? true : false;
        let newCell = new Cell(i, rand);

        $("#wrapper").append($(div_str).clone()
            .attr('id', newCell.id)
            .css('background-color', '#EE7600')
            .css('opacity', newCell.status ? 1 : 0));
        grid.push(newCell);
        if(newCell.status) live_cells++;
        $('#score-board').html("Live Cells: " + '<span style=color:#EE7600>' + live_cells + '</span>');
    }
    $('.cell').click(function(e) {
        toggleLife(grid[e.target.id]);
    } );

});

//click handler callback
function toggleLife(cell){
    if(cell.status){
        cell.death();
    }else{
        console.log(cell.id);
        cell.birth();
    }
    $("#score-board").html("Live Cells: " + '<span style=color:#EE7600>' + live_cells + '</span>');

}

//spawn generation
function generation(){
    live_cells = 0;

    grid.forEach(function(cell){
        if(cell.status){
            if(cell.getNumLiveNeighbors() < 2){
                cell.death();
            }else if(cell.getNumLiveNeighbors() > 3){
                cell.death();
            }
        }else{
            if(cell.getNumLiveNeighbors() == 3){
                cell.birth();
            }
        }
    });
    $("#score-board").html("Live Cells: " + '<span style=color:#EE7600>' + live_cells + '</span>');
}

//Cell class
class Cell{
    constructor(id, status){
        this.id = id;
        this.status = status;
    }

    getNeighbors(){
        let neighbors =  [
            grid[this.id - cols - 1], grid[this.id - cols], grid[this.id - cols + 1], 
            grid[this.id - 1], grid[this.id + 1],
            grid[this.id + cols -1], grid[this.id + cols], grid[this.id + cols + 1]
        ];

        return neighbors;
    }

    getNumLiveNeighbors(){
        let arr = this.getNeighbors().filter(function(cell){
            if(cell){
                return cell.status;
            }
        });
        return arr.length;
    }

    death(){
        this.status = false;
        $('#' + this.id).animate({ opacity: 0 });
        live_cells--;
    }

    birth(){
        this.status = true;
        $('#' + this.id).animate({ opacity: 1 });
        live_cells++;
    }
}