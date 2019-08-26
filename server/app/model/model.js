const mysql = require('../database_config/mysql/mysqlconfig')

let Boards = function (board) {
    this.board_no = board.board_no
    this.title = board.title
    this.content = board.content
    this.pw = board.pw
    this.id_ = board.id_
    this.name_ = board.name_
    this.dept_name = board.dept_name
    this.rank_ = board.rank_
}

//##############################################################################################################
//create a board
Boards.createBoard = function (newBoard, result) {
    //console.log(`2 query wirte`);
    const { title, content, id_, pw, dept_name, name_, rank_ } = newBoard
    const params = [ title, content, id_, pw, dept_name, name_, rank_ ]
    mysql.query("insert into rdb.board2 ( title, content, id_, pw, dept_name, name_,rank_ , reg_date) values (?, ?, ?, ?, ?, ?, ?,now())",
       params, function (err, queryResult) {
            //console.log("3 INSERT query pass");
            err? result(err, null) : result(queryResult)//insert -> result row가 없음
        })
}

//##############################################################################################################
//read a board
Boards.readBoard = function (board_no, result) {
    //console.log(`2 query wirte`,board_no)
    mysql.query("select * from board2 where board_no = ?",
     board_no, function (err, queryResult) {
        //console.log("3 select query pass")
        err ? result(null, err) : result(null,queryResult)
    })
}

//##############################################################################################################
// READ - ALL
Boards.getAllBoard = function (page_number,title,dept_name,result) {    //page_number = 호출 페이지 번호
    mysql.query("select count(*) as cnt from rdb.board2", function (err, totalCount) {
        let { cnt }  = totalCount[0]
        // console.log(` cnt ` ,cnt);
        
        let pageSize = 10
        //console.log("SELECT ALL query pass");
        
        //자바에 익숙해서 처음에 아래의 방법을 사용했습니다. 근데 js는 소수점도 반환하는 나누기를 무조건 하기에 저렇게 하는것보단 나누어진 값에서 소수점 올림하는게 더 나은것 같아서 수정했습니다.
        // let totalPage = (cnt/pageSize) + (cnt % pageSize == 0 ? 0:1 )
        let totalPage = Math.ceil(cnt/pageSize);
        let startCount = ( page_number - 1 ) * pageSize +1 
        let endCount =  page_number * pageSize
        title = '%'+title+'%';
        dept_name = '%'+dept_name+'%';
        mysql.query(`select * from ( select * from rdb.board2 where dept_name like '%`+{dept_name}+`%' and title like '%`+{title}+`%'  order by board_no desc limit ${startCount},${pageSize}) as a limit 0,${pageSize}`,
        (err,queryResult)=>{
            const total_result = {
                totalCount : totalPage,
                queryResult : queryResult,
            }
            err ? result(null,err) : result(null,total_result)
        })
    })
}

//##############################################################################################################
//put - UPDATE
Boards.updateBoard = function (board, result) {
    //console.log(`2 update query wirte`,board_no)
    const { title, content, pw, name_, dept_name, board_no, rank_ } = board
    const params =[ title, content, name_, dept_name, rank_, board_no, pw ]
    
    mysql.query("update board2 set title = ?, content = ? , name_ = ?, dept_name = ?, rank_ = ? where board_no = ? and pw = ?",
     params, function (err, queryResult) {
        //console.log("3 update query pass",queryResult)
        // console.log(queryResult.affectedRows);//업데이트된 행의 수, 0이면 비밀번호 오류 등의 오류로 실패, 1이면 성공, 2라면 뭔가 잘못된거
        
        // err ? result(null,err) : result(queryResult)
        err ? result(null,err) : result(null,queryResult.affectedRows)
    })
}
 
//##############################################################################################################
//delete - DELETE delete_a_board
Boards.deleteBoard = function (newBoard, result) {
    const {board_no, pw  } = newBoard
    const params = [board_no, pw ]

    mysql.query('delete from board2 where board_no = ? and pw = ? ',
     params, function (err, queryResult) {
        err ? result(null, err) : result(null,queryResult.affectedRows)
    })
}
module.exports = Boards;