import express from 'express'
import {Contenedor} from "./componentes/contenedor"
import {Carrito} from "./componentes/carrito"

const {Router} = express


require('dotenv').config()

const app = express()
const routerProductos = Router()
const routerCarrito = Router()

app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const object = new Contenedor("", 0 ,"")
const cart = new Carrito("")

let admin = true

const permisos = (req, res, next) =>{
    if (admin){
        next()
    } else {
        res.send({
            error: '-1, descripción: ruta no autorizado'
        })
    }
}

// API PRODUCTOS

routerProductos.get('/', (req,res) =>{
    const list = object.getAll()
    const f = async () =>{
        res.json(await list)
    }
    f()
})

routerProductos.get('/:id', (req,res) =>{
    const {id} = req.params
        res.json(object.getById(Number(id)))
})

routerProductos.post('/', permisos, (req,res) =>{
    const {title,price,thumbnail} = req.body
    const product = object.save(title,price,thumbnail)
    res.send(product)

})

routerProductos.put('/:id', permisos, (req,res)=>{
    const {id} = req.params
    const {title,price,thumbnail} = req.body
    res.send( object.upload(Number(id),title,price,thumbnail))
})

routerProductos.delete('/:id', permisos,(req,res)=>{
    const {id} = req.params
    res.send(object.deleteById(Number(id)))
})

// API CARRITO

routerCarrito.get('/:id/productos', (req,res) =>{
    const {id} = req.params
        res.json(cart.getCartById(Number(id)))
})

routerCarrito.post('/', (req,res) =>{
    const newCartAdd = cart.saveCart()
    res.send(newCartAdd)
})

routerCarrito.delete('/:id', permisos,(req,res)=>{
    const {id} = req.params
    res.send(cart.deleteCartByID(Number(id)))
})

routerCarrito.delete('/:id/productos/:id_prod',permisos, (req,res)=>{
    const {id,id_prod} = req.params
    res.send(cart.deleteProductByID(Number(id),Number(id_prod)))
}) 

routerCarrito.post('/:id/productos', (req,res) =>{
    const {id} = req.params
    const productToCart = cart.addProductToCart(Number(id))
        res.json(productToCart)
})

const PORT = process.env.PORT

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)

app.listen(PORT, ()=>{
    console.log('server is running on port 8080')
})