const mysql = require('../database_config/mysql/mysqlconfig')

let Comments = function (comment){
    this.board_no = comment.board_no;
    this.content = comment.content;
    this.id_ = comment.id_;
    this.pw = comment.pw; 
    this.rank_ = comment.rank_;
    this.dept_name = comment.dept_name;
    this.name_ = comment.name_;
    this.comment_no = comment.comment_no;
}

//##############################################################################################################
//select - Select comment2
Comments.getAllComments = function (board_no, result) {
    mysql.query(`select * from rdb.comment2 where board_no = ${board_no} order by comment_no asc `,
     (err,queryResult)=>{
        err ? result(null,err) : result(null,queryResult)
    })
}

//##############################################################################################################
//insert - Insert comment2
Comments.insertComment = function (newComment, result) {
    const { board_no, content, id_, pw, dept_name, name_, rank_ } = newComment
    const params = [board_no, content, id_, pw, dept_name, name_, rank_ ]
    mysql.query(
        "insert into rdb.comment2 ( board_no, content, id_, pw, dept_name, name_,rank_ , reg_date) values (?, ?, ?, ?, ?, ?, ?,now())",
       params, function (err, queryResult) {
            err? result(err, null) : result(queryResult)//insert -> result row가 없음
        })
}

//##############################################################################################################
//update - update comment2
Comments.updateComment = function (newComment, result) {
    const { board_no, content, pw, dept_name, name_, rank_ } = newComment
    const params =[content, name_, dept_name, rank_, board_no, pw ]
    
    mysql.query("update rdb.comment2 set content = ?, name_ = ?, dept_name = ?, rank_ = ? where board_no = ? and pw = ?",
     params, function (err, queryResult) {
        err ? result(null,err) : result(null,queryResult.affectedRows)
    })
}

//##############################################################################################################
//delete - Delete comment2
Comments.deleteComment = function (newComment, result) {
    const {comment_no, pw} = newComment
    const params =[comment_no, pw]
    mysql.query('delete from rdb.comment2 where comment_no = ? and pw = ? ',params,
     function (err,queryResult){
        err ? result(null,err) : result(null,queryResult.affectedRows)
    })
}


module.exports = Comments;