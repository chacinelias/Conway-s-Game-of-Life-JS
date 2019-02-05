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
    }

    birth(){
        this.status = true;
        $('#' + this.id).animate({ opacity: 1 });
    }
}
