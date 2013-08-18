/*globals define:false*/
define('src/app/collections/lines',[
  'backbone',
  'src/app/models/line',
  'src/app/utils'

],

function(Backbone, Line, Utils){
    var boardId = Utils.getBoardId();
    var LineList = Backbone.Collection.extend({
        model: Line,
        url: "api/boards/"+boardId+"/lines/"
    });
    return LineList;
});
