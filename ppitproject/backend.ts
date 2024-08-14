import express from 'express';
import cors from 'cors';
import session from 'express-session'
import expressMysqlSession from 'express-mysql-session'
import { db, dbConfig } from './db';

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


app.get('/', (req, res) => {
  res.send('Hello World!');

});

app.get('/games', async (req, res) => {
    const [rows] = await db.query(`select * from games;`)
    res.send(rows);
});

app.post('/api/signup', async (req, res) => {
  console.log(req.body);
  await db.query(`insert into users (email, username, password) values (:email, :username, :password);`, {
    email: req.body.email,

  })
  res.send('ok');


});

app.listen(3001, () => {
  console.log('backend running on: http://localhost:3001')

 });

