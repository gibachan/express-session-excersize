# セッションのしくみ

サーバーとクライアント（ブラウザ）間でのセッションの管理は、cookieを利用して行われる。

### cookieのやりとり

1. クライアントからサーバへアクセスする。この時にはまだcookieは無い。
2. サーバーからクライアントへセッションIDを送る。
 - HTTPレスポンスのヘッダに'set-cookie: XXXXX=yyyyyy'の形でクライアントに送られる。
3. クライアントはセッションIDをcookieに保存する。
4. クライアントからサーバの別のページへアクセスする時に、セッションIDをサーバへ送る。
 - HTTPリクエストのヘッダにcookieが付与されてサーバー送られる。
5. サーバーは、クライアントから送られてきたセッションIDを確認して、2.のクライアントであることを確認する。

### 実行方法
```
git clone https://github.com/gibachan/express-session-excersize.git

cd express-session-excersize

npm install

npm start
```
ブラウザ```http://localhost:3000``にアクセスし、適当なUser IDとパスワードを入力してログインする。
