'use strict'
const Boards = require('../model/model')
const Comments = require('../model/comment')

//##############################################################################################################
// CREATE
exports.create_a_board = function (req, res) {
    //console.log("1 create board in")
    const new_board = new Boards(req.body)
        Boards.createBoard(new_board, function (err, result) {
            err ? res.send(err) : res.send(result)
            //console.log(`4 insert seccess !`)
        })
}
// READ 
//##############################################################################################################
//list 
exports.get_all_board = function (req, res) {
    const { page_number } = req.params
    let {title, dept_name}  = req.query;
    if(title == null || title == ""){
        title = "";
    }
    if(dept_name == null || dept_name == ""){
        dept_name = "";
    }
    Boards.getAllBoard(page_number, title, dept_name, function (err, result) {
        err ? res.send(err) : res.send(result)
    })
}
// READ 1
exports.read_a_board = function (req, res) {
    const { board_no } = req.params //url을 얻음
    Boards.readBoard(board_no, function (err, result) {
        err ? res.send(err) : res.send(result)
    });
};


//##############################################################################################################
// UPDATE
exports.update_a_board = function (req, res) {
    Boards.updateBoard(new Boards(req.body), function (err, result) {
        err ? res.send(err) : res.send(result)
    })
}
//##############################################################################################################
// DELETE
exports.delete_a_board = function (req, res) {
    const new_board = new Boards(req.body)
    Boards.deleteBoard(new_board, function (err, new_board) {
        if (err)
            res.send(err);
        res.json({ message: 'Board successfully deleted' });
    });
};
//##############################################################################################################
// get comments
exports.get_all_comments = function(req,res){
    Comments.getAllComments(req.params.board_no, function(err,result){
        err ? res.send(err) : res.send(result)
        
    });
};
//##############################################################################################################
// insert_comment
exports.insert_comment = function (req, res) {
    const new_Comment = new Comments(req.body)
    Comments.insertComment(new_Comment, function (err, result) {
        err ? res.send(err) : res.send(result)
    })

}

//##############################################################################################################
// update_comment
exports.update_comment = function (req, res) {
    const new_Comment = new Comments(req.body)
    Comments.updateComment(new_Comment, function (err, result) {
        err ? res.send(err) : res.send(result)
    })

}

//##############################################################################################################
// delete_comment
exports.delete_comment = function (req, res) {
    const new_Comment = new Comments(req.body)
    Comments.deleteComment(new_Comment, function (err, result) {
        err ? res.send(err) : res.send(result)
    })

}



