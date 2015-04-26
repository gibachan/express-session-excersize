var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

// テスト用のユーザデータ
var testUser = {
  userId: '',
  password: ''
};

// Expressアプリを生成
app = express();

// Expressアプリの設定
// -----------------------------------------

// ビューのテンプレートエンジンをjadeにする
app.set('view engine', 'jade');

// ミドルウェアの設定
// -----------------------------------------

// ブラウザからPOSTで送られたデータをres.bodyで受け取れるようにする
app.use(bodyParser.urlencoded({
  extended: true
}));

// セッション管理の設定（req.session、res.sessionでアクセスできる）
// name             : セッションID（Cookie）の名前
// secret           : セッションIDの署名となる文字列。内緒にすること！
// cookie maxAge    : セッション（Cookie）の賞味期限（単位はミリ秒）
// cookie httpOnly  : Cookieのアクセスをhttpだけにする設定。JavaScriptからアクセスするために、ここではfalseに設定する。
// resave           : セッションストア（セッション情報の保存先）に強制書き込みするかを設定
// saveUninitialized: セッションを初期化せずに保存するかを設定。
app.use(session({
  name: 'MyCookie',
  secret: "This is secret",
  cookie: {
    maxAge: 30 * 60 * 1000,
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
}));

// ルーティング
// -----------------------------------------

// ホーム
app.get('/', function(req, res) {
  res.render('index', {});
});

// ログイン(POST)
app.post('/login', function(req, res) {

  // ブラウザから送られたデータを受け取る
  var userId = req.body.userId;
  var password = req.body.password;

  // データベースと照合して、ログインの成否を確認する
  // （ここでは省略）
  testUser = {
    userId: userId,
    password: password
  };

  // ログインに成功したら、セッションに格納する
  /**
  * ここで、サーバーからブラウザにセッションIDを送る。
  * 具体的には、サーバーから送られるHTTPレスポンスのヘッダーに
  * set-cookie: MyCookie=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx..
  * が含まれ、ブラウザにセッションIDがcookieとして格納される
  */
  req.session.userId = userId;
  // console.log('cookie: ' + res.req.headers.cookie)

  // /userページへリダイレクトする
  res.redirect('/user');
});

// ユーザーページ（要ログイン）
app.get('/user', function(req, res) {
  /**
  * ここでブラウザから送られるcookieからセッションIDを調べ、
  * セッションIDが有効なら、req.session.userIdが有効となり、
  * セッションIDが無効であれば、req.session.Idは無効（undefined）となる
  */
  if (req.session && req.session.userId) {
    // セッション情報のuserIdを使って、データベースからユーザデータを再取得する
    // （ここでは省略）
    res.render('user', {
      userId: testUser.userId,
      password: testUser.password
    });
  } else {
    // セッションにuserIdがない = ログインしていない
    res.render('index', {
      error: 'Not logged in'
    });
  }
});

// ログアウト
app.get('/logout', function(req, res) {
  // セッションを破棄する
  if (req.session) {
    req.session.destroy();
  }
  res.redirect('/');
});

// サーバーを起動（ポート番号3000）
// -----------------------------------------
var server = app.listen(3000, function() {
  console.log('Server is listening');
});
