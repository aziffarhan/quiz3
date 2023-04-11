const express = require('express')
const app = express()
const port = 1947

app.use(express.json())
app.post('/login', (req, res) => {
    console.log(req.body)

    let result = login(req.body.username, req.body.password)
    res.send(result)
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

app.get('/bye', (req, res) => {
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