'use strict'
module.exports = (app) =>{
    const Board = require('../controller/controller')
    console.log(`index route `)
    
    //board
    //##############################################################################################################
    //create
    app.route('/board').post(Board.create_a_board)                                              //create   새로만들기
    
    //##############################################################################################################
    //read
    app.route('/list/:page_number').get(Board.get_all_board)                                                  //list만들기 //TODO
    app.route('/board/:board_no').get(Board.read_a_board)                                              //read detail

    //##############################################################################################################
    //update  delete
    app.route('/board/:board_no').put(Board.update_a_board)                                                 //update
    app.route('/board/:board_no').delete(Board.delete_a_board)                                              //delete

    //##############################################################################################################
    //comments
    // app.route('./board/comment/:board_no').get(Board.read_this_comments);
    // app.route('./board/comment/:board_no').put(Board.update_a_board);
    // app.route('./board/comment/:board_no').delete(Board.delete_a_comment);



}