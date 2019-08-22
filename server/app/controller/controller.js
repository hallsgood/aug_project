'use strict'
const Boards = require('../model/model')

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
    //console.log('get_all_board in');
    const { page_number } = req.params
    Boards.getAllBoard(page_number,function (err, result) {
       // console.log(`asdfa`);
        
        err ? res.send(err) : res.send(result)
    })
}
// READ 1
exports.read_a_board = function (req, res) {
    //console.log(`1 read a board`,req.body);
    const { board_no } = req.params //url을 얻음
    Boards.readBoard(board_no, function (err, result) {
        err ? res.send(err) : res.send(result)
        //console.log(`4 a baord read seccess !`, result)
    });
};


//##############################################################################################################
// UPDATE
exports.update_a_board = function (req, res) {
    //console.log(`1 update a board`,req.body)
    const { board_no } = req.params 
    Boards.updateBoard(board_no, new Boards(req.body), function (err, result) {
        //console.log(`4 update seccess !`)
        err ? res.send(err) : res.send(result)
    })
}



//##############################################################################################################
// DELETE
exports.delete_a_board = function (req, res) {
    const { board_no } = req.params
    Boards.deleteBoard(board_no, function (err, board) {
        if (err)
            res.send(err);
        res.json({ message: 'Board successfully deleted' });
    });
};



