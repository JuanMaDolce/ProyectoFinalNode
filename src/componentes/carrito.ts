import fs from "fs"

let time = new Date()


export class Carrito {
    private timestamp: string;
    
constructor(timestamp: string) {
    this.timestamp = timestamp
    }
    getCartById(id){
        let cartFile = fs.readFileSync("./src/componentes/carrito.txt", "utf-8")
        let cartFileParse = JSON.parse(cartFile) 
        try{
            if (cartFileParse.find( c => c.id === id)){
                const cart = cartFileParse.find( c => c.id === id);
                return cart
            } else {
                const error = {error: 'ID de carrito inexistente' }
                return error
            }
        } catch (err){
            console.log(err)
        }
    }
    saveCart(){
        let cartFile = fs.readFileSync("./src/componentes/carrito.txt", "utf-8")
        let cartFileParse = JSON.parse(cartFile) 
        let newCart = {
            timestamp: time.toLocaleString()
        }            
        if(cartFileParse.length){
            let id = cartFileParse[cartFileParse.length - 1].id + 1
            fs.writeFileSync("./src/componentes/carrito.txt", JSON.stringify([...cartFileParse, {...newCart, id: id}], null, 2))
            const rta = {
                newCart,
                id
            }
            return rta
        } else {
            fs.writeFileSync("./src/componentes/carrito.txt", JSON.stringify([...cartFileParse, {...newCart, id: 1}], null, 2))
            const rta2 = {
                newCart,
                id: 1
            }
            return rta2
        }  
    } 
    deleteCartByID(id){
        let cartFile = fs.readFileSync("./src/componentes/carrito.txt", "utf-8")
        let cartFileParse = JSON.parse(cartFile) 
            try{
                if ((cartFileParse.find(c => c.id === id))){
                    const newArray = cartFileParse.filter(c => c.id !== id)
                    fs.writeFileSync("./src/componentes/carrito.txt", JSON.stringify(newArray, null, 2))
                    const supr = `Carrito ID ${id} eliminado`
                    return supr
                    
                } else {
                    const error = 'ID de Carrito es inexistente'
                    return error
                }
            } catch (err) {
                console.log(err)
            }
        }
        deleteProductByID(id,id_prod){
            let cartFile = fs.readFileSync("./src/componentes/carrito.txt", "utf-8")
            let cartFileParse = JSON.parse(cartFile)
                if (cartFileParse.find(c => c.id === id)){
                    
                    const cart = cartFileParse.find( c => c.id === id)
                    
                    const cartProducts = cartFileParse.find( c => c.id === id).product

                    let newProducts = cartProducts.filter(p=>p.id !== id_prod)

                    const newCart = {
                        timestamp: cart.timestamp,
                        products: newProducts,
                        id: cart.id
                    }

                    const newArray = cartFileParse.filter(c => c.id !== id)
                    newArray.unshift(newCart)
                    fs.writeFileSync("./src/componentes/carrito.txt", JSON.stringify(newArray, null, 2))
                    const cartUpload = {
                        message: 'Producto modificado',
                        newCart
                    }
                    return cartUpload
                } else{
                    const error = {error: 'ID de producto inexistente' }
                    return error 
                } 
            } 
        addProductToCart(id){
            let cartFile = fs.readFileSync("./src/componentes/carrito.txt", "utf-8")
            let cartFileParse = JSON.parse(cartFile)
            let dataFile = fs.readFileSync("./src/componentes/productos.txt", "utf-8")
            let dataFileParse = JSON.parse(dataFile)

            let product: object = dataFileParse.find( c => c.id === id);
            let arrayProducts: any [] = []

            arrayProducts.push(product)

            let newChart = {
                timestamp: time.toLocaleString(),
                product: arrayProducts
            }            
            if(cartFileParse.length){
                let id = cartFileParse[cartFileParse.length - 1].id + 1
                fs.writeFileSync("./src/componentes/carrito.txt", JSON.stringify([...cartFileParse, {...newChart, id: id}], null, 2))

                const productToCart = {
                    message: 'Producto agregado al carrito',
                    newChart,
                    id
                }
                return productToCart

            } else {
                fs.writeFileSync("./src/componentes/carrito.txt", JSON.stringify([...cartFileParse, {...newChart, id: 1}], null, 2))
                const productToCart2 = {
                    message: 'Producto agregado al carrito',
                    newChart,
                    id: 1
                }
                return productToCart2
            }  
        } 
}
