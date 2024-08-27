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

app.get('/api/games', async (req, res) => {
  const [rows] = await db.query(`select * from games;`)
  res.send(rows);
});
//select * from games where id=5
app.get('/api/games/:gameId', async (req, res) => {
  const [[game]] = await db.query<any>(`select * from games where id = :gameId;`, { gameId: req.params.gameId })
  res.send(game);
});

app.get('/api/games/category/:category_name', async (req, res) => {
  const [games] = await db.query<any>(`select * from games where category_name = :category_name;`,
    { category_name: req.params.category_name }
  )

  res.json(games)
})

app.get('/api/ratings/:gameId', async (req, res) => {
  const [rows] = await db.query(`select avg(rating) as average_rating from ratings where game_id = :gameId;`, {
    gameId: req.params.gameId,

  });
  res.send(rows[0]);

});

app.get('/api/reviews/:gameId', async (req, res) => {
  const [rows] = await db.query(`select content, username, rating, created_at from reviews
inner join users on users.id = reviews.user_id  
where game_id = :gameId;`,
    { gameId: req.params.gameId }
  )
  res.json(rows)
});

app.post('/api/reviews/:gameId', async (req, res) => {
  console.log(req.body)
  await db.query(`
    insert into reviews (user_id, game_id, content)
    value (:user_id, :game_id, :content)
  `, {
    user_id: req.session.userId,
    game_id: req.params.gameId,
    content: req.body.content
  })
  res.json({success: true})

})



app.post('/api/ratings/:gameId', async (req, res) => {
  if (!req.session.userId) {
    res.send({ error: 'not logged in' });
    return;
  }

  await db.query(`
      insert into ratings (user_id, game_id, rating)
      values (:user_id, :game_id, :rating)
       on duplicate key update rating = :rating;
  `, {
    user_id: req.session.userId,
    game_id: req.params.gameId,
    rating: req.body.rating
  })
  res.send({ success: true });
});
app.get('/api/cart', async (req, res) => {
  if (!req.session.userId) {
    res.send({ error: 'not logged in' });
    return;
  }
  const [rows] = await db.query(`select games.* from cart join games on games.id = cart.game_id where cart.user_id = :user_id;`, {
    user_id: req.session.userId,
  })
  res.send(rows);
});

app.delete('/api/cart/:gameId', async (req, res) => {
  if (!req.session.userId) {
    res.send({ error: 'not logged in' });
    return;
  }
  await db.query(`delete from cart where user_id = :user_id and game_id = :game_id;`, {
    user_id: req.session.userId,
    game_id: req.params.gameId,
  })
  res.send({ success: true });
});

app.post('/api/cart', async (req, res) => {
  if (!req.session.userId) {
    res.send({ error: 'not logged in' });
    return;
  }
  await db.query(`insert into cart (user_id, game_id) values (:user_id, :game_id);`, {
    user_id: req.session.userId,
    game_id: req.body.gameId,
  })
  res.send({ success: true });
});

app.post('/api/login', async (req, res) => {
  const [[user]] = await db.query<any>(`select password from users where username = :username;`, {
    username: req.body.username,
  })

  if (!user) {
    res.send({ error: 'invalid username' });
    return;
  }

  if (await bcrypt.compare(req.body.password, user.password)) {
    const [rows] = await db.query<any>(`select id from users where username = :username;`, {
      username: req.body.username,
    })
    req.session.userId = rows[0].id;
    res.send({ success: true });
  } else {
    res.send({ error: 'invalid username or password' });
    return;
  }
});

app.post('/api/logout', async (req, res) => {
  req.session.userId = null;
  res.end();
});
app.get('/api/user', async (req, res) => {
  if (!req.session.userId) {
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
  res.send({ success: true });
});

const proxy = httpProxy.createProxyServer({
  Headers: {},
  target: { host: 'localhost', port: 3000, },
});

app.use('/', (req, res) => {
  delete req.headers.origin
  proxy.web(req, res)
});

app.listen(3001, () => {
  console.log('backend running on: http://localhost:3001')

}).on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head)
})

