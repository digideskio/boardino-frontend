/* globals define:false, io:false, window:false, $:false */
define("app/history",[
    'app/models/postit'
],

function(Postit) {

    var History = function(boardView) {
        this.boardView = boardView;
        this.size = 10;
        this.stacker = new Array(this.size);
        this.pointer = 0;
    };

    History.prototype.push = function(data) {
        if(this.isFull() === false) {
            this.stacker[this.pointer] = data;
            this.pointer++;
            return true;
        }
        else {
            return false;
        }
    };
      
    History.prototype.pop = function() {
        if(this.isEmpty !== true) {
            this.pointer--;
            return this.stacker[this.pointer];
        }
        else {
            return false;
        }
    };
  
    History.prototype.isEmpty = function() {
        return this.pointer === 0;
    };

    History.prototype.isFull = function(){
        return this.pointer === this.size;
    };

    History.prototype.add = function(action, data) {
        this.push({action: action, data: data});
    };

    History.prototype.undo = function() {
        var lastAction = this.pop();
        if (lastAction) {
            switch(lastAction.action) {
                case "removed_postit":
                    var postit = new Postit({
                        "x":lastAction.data.get("x"),
                        "y":lastAction.data.get("y"),
                        "width":lastAction.data.get("width"),
                        "height":lastAction.data.get("height"),
                        "back_color": lastAction.data.get("back_color"),
                        "text":lastAction.data.get("text")
                    });
                    this.boardView.addPostit(postit);
                    break;
                case "removed_text":
                    this.boardView.addOneText(lastAction.data);
                    break;
            }
        }
    };

    return History;
});
