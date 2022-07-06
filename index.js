const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')
const port = 3000
const app = express()
app.use(express.json())

const orders = []

app.post('/order', (request, response) =>{
    const {order, clientName,price } =request.body 

    const orderBurguer = {id: uuid.v4(), order, clientName, price, status:"Em preparação"}

    orders.push(orderBurguer)

    return response.status(201).json(orderBurguer)
    
})

app.get('/order', (request, response) =>{
    return response.json(orders)
})

app.put('/order/:id', (request, response) =>{
    const {id} = request.params

    const {order, clientName,price,status } =request.body 
    
    const update = { id, order, clientName, price, status}
    
    const index = orders.findIndex(order => order.id === id)

        
    if(index < 0){
        return response.status(404).json({error:"Pedido não encontrado"})
    }

    orders[index] = update

    return response.status(201).json(update)

})

app.delete('/order/:id', (request, response) =>{
    const {id} = request.params

    const index = orders.findIndex(order => order.id === id)

    if(index < 0){
        return response.status(404).json({error:"Pedido não encontrado"})
    }

    orders.splice(index,1)

    return response.status(204).json()
})

app.get('/order/:id', (request, response) =>{
    const {id} = request.params
    
    const index = orders.findIndex(order => order.id === id)

    if(index < 0){
        return response.status(404).json({error:"Pedido não encontrado"})
    }

    return response.status(203).json(orders[index])
})

app.patch('/order/:id', (request, response) =>{
    const {id} = request.params

    const index = orders.findIndex(order => order.id === id)

    const select = orders[index]

    const {order, clientName, price} = select

    const status = "pronto"

    const update = { id, order, clientName, price, status}

    

    if(index < 0){
        return response.status(404).json({error:"Pedido não encontrado"})
    }

    orders[index] = update

    return response.status(201).json(update)
})


app.listen(3000, () =>{
    console.log(`Server started on port ${port}`)
})


