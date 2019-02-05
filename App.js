let grid = []; //contains cell instances
let prev_grid = []; //contains booleans

const rows = 10;
const cols = 10;
const initial_prob = 0.3; //probability that a cell is alive
let live_cells = 0;
let interval;
let toggle_auto = false;
let framerate = 100;

//initial creation of grid/cells and display scoreboard
$(document).ready(function () {
    let div_str = '<div class=\"cell\"/>';

    for (let i = 0; i < rows * cols; i++) {
        let rand = Math.random() <= initial_prob ? true : false;
        let newCell = new Cell(i, rand);
        grid.push(newCell);
        prev_grid.push(rand);

        $('#wrapper').append($(div_str).clone()
            .attr('id', newCell.id)
            .css('background-color', '#EE7600')
            .css('opacity', newCell.status ? 1 : 0));
        if (newCell.status) live_cells++;
        showScoreboard();
    }

    $('.cell').click(function (e) {
        cell = grid[e.target.id];

        if (cell.status) {
            cell.death();
        } else {
            cell.birth();
        }

        live_cells = 0;
        for (let i = 0; i < grid.length; i++) {
            prev_grid[i] = grid[i].status;

            if (grid[i].status) live_cells++;
        }
        showScoreboard();
    });

    $('.button').click(function (e) {
        let button = e.target.id;

        if (button === 'gen_button') {
            generation();
        } else if (button === 'autoGen_button') {
            autoGen();
        }
    })
});

//spawn generation
function generation() {
    live_cells = 0;

    for (let i = 0; i < grid.length; i++) {
        let num = getNumLiveNeighbors(i);

        if (prev_grid[i]) {
            if (num < 2 || num > 3) grid[i].death();

        } else {
            if (num == 3) grid[i].birth();

        }
    }

    for (let i = 0; i < grid.length; i++) {
        prev_grid[i] = grid[i].status;

        if (grid[i].status) live_cells++;
    }

    showScoreboard();
}

//generate automatically
function autoGen() {

    if (!toggle_auto) {
        interval = setInterval(generation, framerate);
        toggle_auto = true;
    } else {
        clearInterval(interval);
        interval = null;
        toggle_auto = false;
    }
}

//show SCOREBOARD
function showScoreboard() {
    $('#scoreboard').html('Live Cells:' + '<span style=color:#EE7600>' + live_cells + '</span>');

}

function getNumLiveNeighbors(i) {

    let neighbors = [
        prev_grid[i - cols - 1], prev_grid[i - cols], prev_grid[i - cols + 1],
        prev_grid[i - 1], prev_grid[i + 1],
        prev_grid[i + cols - 1], prev_grid[i + cols], prev_grid[i + cols + 1]
    ];

    let sum = 0;

    neighbors.forEach(function (cell) {
        if (cell) sum++;
    });

    return sum;
}
