const express = require('express')
const app = express()
const port = 1947
const jwt = require('jsonwebtoken');

app.use(express.json())
app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(req.body.username, req.body.password)
    let token = generateToken(result)
    res.send(token)
})

app.use(express.json())
app.post('/register', (req, res) => {
  console.log(req.body)

  let result = register(req.body.username, req.body.password, req.body.name, req.body.email)
  res.send(result)
})

app.get('/', (req, res) => {
  res.send('Hello UTeM!')
})

app.get('/bye', verifyToken, (req, res) => {
  res.send('Bye bye UTeM!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function login(reqUsername, reqPassword){
  let matchUser = dbUsers.find(user => user.username == reqUsername)
  if(!matchUser) return "User not found!"
  if(matchUser.password == reqPassword){
      return matchUser
  }
  else
  {
      return "Invalid password!"
  }
}

function register(reqUsername, reqPassword, reqName, reqEmail){
  dbUsers.push({
      username: reqUsername,
      password: reqPassword,
      name: reqName,
      email: reqEmail
  })
}

function generateToken(userData){
  const token = jwt.sign(
    userData,
    'ayamguring',
    { expiresIn: 60 }
  );
  return token;
}

function verifyToken(req, res, next){
  let header = req.headers.authorization
  console.log(header)

  let token = header.split(' ')[1]

  jwt.verify(token, 'ayamguring', function(err, decoded){
    if(err){
      res.send("Invalid Token")
    }
    req.user = decoded
    next()
  });
}

let dbUsers = [
  {
      username: "azif",
      password: "123456",
      name: "Azif",
      email: "aziffarhan1947@gmail.com"
  },
  {
      username: "ayam",
      password: "biskutlutut",
      name: "Ayam",
      email: "ayamguring@gmail.com"
  },
  {
      username: "abu",
      password: "abudabest",
      name: "Abu",
      email: "abudabest@gmail.com"
  }
]