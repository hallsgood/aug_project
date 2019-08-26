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
    app.route('/list/:page_number').get(Board.get_all_board)                                           //list만들기 //TODO
    app.route('/board/:board_no').get(Board.read_a_board)                                              //read detail

    //##############################################################################################################
    //update  delete
    app.route('/board').put(Board.update_a_board)                                                 //update
    app.route('/board').delete(Board.delete_a_board)                                              //delete

    //##############################################################################################################
    //comments ///////////21321321
    app.route('/comment/:board_no').get(Board.get_all_comments);
    app.route('/comment').post(Board.insert_comment); 
    app.route('/comment').put(Board.update_comment);
    app.route('/comment').delete(Board.delete_comment); 



}