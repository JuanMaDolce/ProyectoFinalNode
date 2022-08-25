import express from 'express'
import {Contenedor} from "./componentes/contenedor"
import {Carrito} from "./componentes/carrito"
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const object = new Contenedor("", 0 ,"")
const cart = new Carrito("")

const admin = true

// API PRODUCTOS

app.get('/productos', (req,res) =>{
    const list = object.getAll()
    const f = async () =>{
        res.json(await list)
    }
    f()
})

app.get('/productos/:id', (req,res) =>{
    const {id} = req.params
        res.json(object.getById(Number(id)))
})

app.post('/productos', (req,res) =>{
    const {title,price,thumbnail} = req.body
    if(admin){
    res.send(object.save(title,price,thumbnail))
    } else {
        res.send({
            error: '-1, descripción: ruta no autorizado'
        })
    }
})

app.put('/productos/:id', (req,res)=>{
    const {id} = req.params
    const {title,price,thumbnail} = req.body
    if(admin){
    res.send( object.upload(Number(id),title,price,thumbnail))
    } else {
        res.send({
            error: '-1, descripción: ruta no autorizado'
        })
    }
})

app.delete('/productos/:id', (req,res)=>{
    const {id} = req.params
    if(admin){
    res.send(object.deleteById(Number(id)))
    } else {
        res.send({
            error: '-1, descripción: ruta no autorizado'
        })
    }
})

// API CARRITO

app.get('/carrito/:id/productos', (req,res) =>{
    const {id} = req.params
        res.json(cart.getCartById(Number(id)))
})

app.post('/carrito', (req,res) =>{
    res.send(cart.saveCart())
})

app.delete('/carrito/:id', (req,res)=>{
    const {id} = req.params
    if(admin){
    res.send(cart.deleteCartByID(Number(id)))
    } else {
        res.send('No eres el administrador')
    }
})

app.delete('/carrito/:id/productos/:id_prod', (req,res)=>{
    const {id,id_prod} = req.params
    if(admin){
    res.send(cart.deleteProductByID(Number(id),Number(id_prod)))
    } else {
        res.send('No eres el administrador')
    }
}) 

app.post('/carrito/:id/productos', (req,res) =>{
    const {id} = req.params
        res.json(cart.addProductToCart(Number(id)))
})

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log('server is running on port 8080')
})