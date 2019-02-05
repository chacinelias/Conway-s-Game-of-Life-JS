class Cell{
    constructor(id, status){
        this.id = id;
        this.status = status;
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
