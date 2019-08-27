# SERVER

## 프로젝트 환경 및 사용 기술

#### 환경 및 사용 

 |환경|제품|
 |:---:|:---:|
 |OS|***WindowOS ver.10***|
 |DataBase|***MySQL(RDBMS)***|
 |DB GUI tool| *MySQL Workbench* |
 |Server Side platform| ***Node.js***|
 |Text Editor| *Visual Studio Code* |
 |DVCS| *Git* |

#### Node.js modules

 - module manager : `yarn` : `npm` 의 단점을 보완하여 나온 `module manager` ( 패키지 버전 통일? )

| module|버전|명령어|설명|
|:---:|:---:|:---:|:---:|
| `express` | 1.19.0 | ___yarn add express___ | Node.js를 위한 Web Framework |
| `body-parser` | 4.17.1 | ___yarn add body-parser___ | 요청 받은 바디에 대한 파싱을 위한 모듈 |
| `mysql` |2.17.1 | ___yarn add mysql___ | MySQL 연결을 위한 모듈 |

 - RDBMS : 관계형 데이터베이스 관리 시스템(relational database management system)
 - 서버 사이드(Server-Side) : 네트워크의 한 방식인 클라이언트-서버 구조의 서버 쪽에서 행해지는 처리를 말함.
 - 분산 버전 관리(Distributed Revision Control System)

---

## 프로젝트 디렉토리 구조
```
aug_project_master
│
├───front/                              # React.js Project
│   │
│   └───...
│
└───server/                             # Node.js Project
    │
    ├───app/                            # ---- folder ----
    │   │
    │   ├───controller/                 # ---- folder ---- 
    │   │   │
    │   │   └───controller.js           # indexRoute를 통해 각각의 함수로 들어 가게 되면 
    │   │                               # 해당 함수는 요청받은 내용(req)을 토대로 model로 
    │   │                               # 보낸다. 클라이언트로 응답(res)시 삼항연산으로 
    │   │                               # 결과(err or result)를 보낸다. (3)
    │   │    
    │   ├───database_config/            # ---- folder ----
    │   │   │
    │   │   └───mysql/                  # ---- folder ----
    │   │       │
    │   │       └───mysqlconfig.js      # MySQL 연결, model에서 사용
    │   │
    │   ├───model/                      # ---- folder ----  
    │   │   │                           # DB 접근(SQL), DB 칼럽과 동일한 객체를 
    │   │   │                           # 만들어 담아 Controller에 전달 (4)
    │   │   │
    │   │   ├───comment.js              # 댓글 관련, 
    │   │   │
    │   │   └───model.js                # 보드 관련, 
    │   │
    │   └───routes/                     # ---- folder ----
    │       │
    │       └───indexRoute.js           # 클라이언트에서 각각의 REST verb(행위)와    
    │                                   # resource(자원)에 맞게 요청이오면 server.js를 
    │                                   # 지나 이곳에서 구체적으로 구분짓는다. (2)
    │`
    ├───node_modules/                   # 필요한 모듈 설치시, 여기에 설치됨
    │
    ├───package.json                    # package 정보, 의존중인 버전 정보
    │
    ├───server.js                       # 서버 메인 파일 (1)
    │
    └───yarn.lock                       # package 버전 통합
    
```

---

## 대략적인 코드 설명

---

#### **server.js**

 > 종속들(`express`, `body-parser`) 불러오기
```javascript
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
```

 > 환경 변수 `PORT`에 `5000`번을 사용하겠다.(수신대기 시켜놓음)
```javascript
const PORT = process.env.PORT || 5000;
```

 > - `app.listen(PORT)` : 위 포트로 수신 허용하겠다.
 > - `bodyParser.urlencoded()` : `true`이면  `qs.parse 모듈`, `false`이면 `query-string 모듈`를 사용, 둘의 차이는 object 상속 가능 여부(`qs.parse 모듈` 이 가능)
 > - `bodyParser.json()` : JSON 형태로 변환
```javascript
const index = require('./app/routes/indexRoute')
app.listen(PORT)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
index(app)
```

---

#### **indexRoutes.js**

> - ***'use strict'***
 >> -  `strict 모드`는 문법과 런타임 동작을 모두 검사한 후, **실수를 에러로 변환** 하고, 변수 사용을 단순화(Simplifying) 시켜줌.
 >> - 실수를 에러로 변환(Converting mistakes into errors) : 자바스크립트는 오류를 어느정도 무시하고 넘어갈 수 있습니다. 이것이 편하게 코딩을 할 수 있게 하지만, 때로는 심각한 버그를 만들게 됩니다. strict 모드는 이러한 실수를 에러로 변환하여 즉시 수정할 수 있게 함.
> - `Express`는 HTTP 메소드에 해당하는 `get`, `post`, `put`, `delete` 와 같은 ***라우팅 메소드***를 지원함


```javascript
app.route('/board/:board_no').get(Board.read_a_board) 
```
> - 위 코드를 해석하면... `'/board/:board_no'`로 `get` 방식으로 요청 받으면 `Board.read_a_board`를 부르겠다


```javascript
'use strict'
module.exports = (app) =>{
    const Board = require('../controller/controller')
    //board
    //create
    app.route('/board').post(Board.create_a_board) 
    //read
    app.route('/list/:page_number').get(Board.get_all_board)
    app.route('/board/:board_no').get(Board.read_a_board)  
    //update  delete
    app.route('/board').put(Board.update_a_board)       
    app.route('/board').delete(Board.delete_a_board)    
```
 - `route()`를 이용하면 라우트 경로에 대하여 체인 가능한 라우트 핸들러를 작성 가능.
 -  경로는 한 곳에 지정되어 있으므로, 모듈식 라우트를 작성하면 중복성과 오타가 감소하여 도움이 됨.
 -  `1`, `2`는 같은 동작을 함.
```javascript
//1
    app.route('/comment').post(Board.insert_comment); 
    app.route('/comment').put(Board.update_comment);
    app.route('/comment').delete(Board.delete_comment); 
```
```javascript
//2    
    app.route('/comment')
        .post(Board.insert_comment)
        .put(Board.update_comment)
        .delete(Board.delete_comment)
    ; 
```

---

#### **controller.js**

 > 1. ***'use strict'***
 >> -  `strict 모드`는 문법과 런타임 동작을 모두 검사한 후, **실수를 에러로 변환** 하고, 변수 사용을 단순화(Simplifying) 시켜줌.
 >> - 실수를 에러로 변환(Converting mistakes into errors) : 자바스크립트는 오류를 어느정도 무시하고 넘어갈 수 있습니다. 이것이 편하게 코딩을 할 수 있게 하지만, 때로는 심각한 버그를 만들게 됩니다. strict 모드는 이러한 실수를 에러로 변환하여 즉시 수정할 수 있게 함.
 > 2. `model`에 요청을 하기위해 선언 
```javascript
'use strict'
const Boards = require('../model/model')
const Comments = require('../model/comment')
```

 > 3. 보기 쉽도록 `camelCase`와 `snake_case` (`model.js`& `comment.js`)로 작성함
 > 4. 해당 함수안에서 `model`의 함수 호출
 > 5. 삼항연산으로 결과값 리턴
```javascript
exports.read_a_board = function (req, res) {
    const { board_no } = req.params
    Boards.readBoard(board_no, function (err, result) {
        err ? res.send(err) : res.send(result)
    });
};
```

---

#### **[directory] model** : `comment.js` , `model.js`

```javascript
const mysql = require('../database_config/mysql/mysqlconfig')
```
 > 해당 테이블의 컬럼과 동일한 객체 생성
```javascript
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
```
 > - 해당 함수(들)은 `controller.js` 에서 호출함
 > - 호출시 Function에서는 쿼리문과 반환값에 필요한 인자값들을 받아옴
 > - 일반적으로 mysql.query(`쿼리문`, `넘어온 인자값`, `쿼리문 성공여부에대한 값을 리턴하는 함수`) 이런 구조로 생겨먹음
 > - `삼항연산` 을 통해 결과값 리턴
```javascript
Boards.readBoard = function (board_no, result) {
    mysql.query("select * from board2 where board_no = ?",
     board_no, function (err, queryResult) {
        err ? result(null, err) : result(null,queryResult)
    })

```

---

#### **mysqlconfig.js**

 > - `MySQL` Connection
 > - `model` 애서 SQL 쿼리문으로 디비연결 시 사용됨
```javascript
const mysql = require('mysql')
const connection = mysql.createPool({
    host:'localhost',
    port:3306,
    user:'계정명',
    password:'비밀번호',
    database:'데이터베이스명',
    dateStrings:true,
})
module.exports = connection
```

## **해당 구조로 짠 이유...**
> ___서버 코드를  짜는 것에 있어서 정답은 없겠지만 짜기전에 `Node.js`를  공부하고 위 코드와는 다른 controller, route, model을 한 파일에 넣어 REST 행위 별로도 짜봤지만 이 코드의 경우에는 가독성(front를 짜는 RouteHandling 부분만 알려주면 되기에?)이 좋은 것 같습니다. 공부를 더해야 감이 올것같지만 구조에 대한 정답은 없는 것 같습니다.( 잘 모르겠다. ) ___




 - 참조
    - https://expressjs.com/ko/guide/routing.html 
    - https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html
