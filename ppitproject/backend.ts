import express from 'express';
import cors from 'cors';
import session from 'express-session'
import expressMysqlSession from 'express-mysql-session'
import { db, dbConfig } from './db';
import httpProxy from 'http-proxy'
import bcrypt from 'bcrypt';

const MySQLSessionStore = expressMysqlSession(session)
const sessionStore = new MySQLSessionStore(dbConfig)

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'foobar-hax',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365,
    },
    saveUninitialized: false,
    resave: false,
    store: sessionStore,
}))

app.get('/games', async (req, res) => {
    const [rows] = await db.query(`select * from games;`)
    res.send(rows);
});

app.post('/api/login', async (req, res) => {
  const [rows] = await db.query<any>(`select * from users where username = :username and password = :password;`, {
    username: req.body.username,
    password: req.body.password,
  })
  if(rows.length === 0) {
    res.send({error: 'invalid username or password'});
    return;
  }
  req.session.userId = rows[0].id;
  res.send({success: true});
});
app.post('/api/logout', async (req, res) => {
  req.session.userId = null;
  res.end();
});
app.get('/api/user', async (req, res) => {
  if(!req.session.userId) {
    res.send(null);
    return;
  }
  const [rows] = await db.query(`select id, username, email from users where id = :id;`, {
    id: req.session.userId,
  })
  res.send(rows[0]);
});

app.post('/api/signup', async (req, res) => {

  console.log(req.body);
  if (req.body.password !== req.body.password_confirmation) {
    res.send({ error: 'passwords do not match' })
    return;
  }
  if (!req.body.password) {
    res.send({ error: 'password cannot be empty' })
    return;
  }
  if (!req.body.username) {
    res.send({ error: 'username cannot be empty' })
    return;
  }
  if (!req.body.email) {
    res.send({ error: 'email cannot be empty' })
    return;
  }
  
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  await db.query(`insert into users (email, username, password) values (:email, :username, :password);`, {
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  })
  res.send({success: true});
});

const proxy = httpProxy.createProxyServer({
  Headers: {},
  target: {host: 'localhost', port: 3000, },
});

app.use('/', (req, res) => {
  delete req.headers.origin
  proxy.web(req, res)
});

app.listen(3001, () => {
  console.log('backend running on: http://localhost:3001')

});

