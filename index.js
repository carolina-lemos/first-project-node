const express = require('express')
const uuid = require('uuid')
const app = express()
const port = 3000
app.use(express.json())


const users = []

const checkUserId = (req, res, next) => {
    const { id } = req.params //isso é a msm coisa que const id = req.params.id
    
    const index = users.findIndex(user => user.id === id)

    if (index < 0){
        return res.status(404).json({error: "User not found"})
    }

    req.userIndex = index
    req.userId = id

    next() 
}


app.get('/users', (req, res) => {

    return res.json(users)
})


app.post('/users', (req, res) => {

    const name = req.body.name
    const age = req.body.age


    const user = { id: uuid.v4(), name, age } // aqui estamos criando um user com o id, o name e o age

    users.push(user) // aqui estamos inserindo os usuários criados no array de usuários

    return res.status(201).json(user) // aqui estamos respondendo com o status 201 pra dizer q deu tuco certo, e com o usuário criado
})


app.put('/users/:id', checkUserId, (req, res) => {

    const { name, age } = req.body
    const index = req.userIndex
    const id = req.userId

    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return res.json(updatedUser)
})


app.delete('/users/:id', checkUserId, (req, res) => {

    const index = req.userIndex

    users.splice(index,1) // aqui queremos deletar o usuário na posição index, somente nesta posição, por isso o 1.
    
    return res.status(204).json() // esse é um status que indica q deu tudo certo, mas sem escrever nenhuma mensagem.

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})