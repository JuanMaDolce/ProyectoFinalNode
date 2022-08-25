import fs from "fs"


let timestamp = new Date()


export class Contenedor {
        private title: string;
        private price: number;
        private thumbnail: string;
        
constructor(title: string, price: number, thumbnail: string) {
        this.title = title,
        this.price = price,
        this.thumbnail = thumbnail
    }
    getAll(){
        let dataFile = fs.readFileSync("./src/componentes/productos.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile) 
        try{
            return dataFileParse
        }
        catch (err){
            return err
        }
    }
    
    save(title,price,thumbnail){
        let dataFile = fs.readFileSync("./src/componentes/productos.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile) 
        let newProduct = {
            title,
            price,
            thumbnail,
            timestamp: timestamp.toLocaleString(),
            stock: 1
        }            
        if(dataFileParse.length){
            let id = dataFileParse[dataFileParse.length - 1].id + 1
            fs.writeFileSync("./src/componentes/productos.txt", JSON.stringify([...dataFileParse, {...newProduct, id: id}], null, 2))
        } else {
            fs.writeFileSync("./src/componentes/productos.txt", JSON.stringify([...dataFileParse, {...newProduct, id: 1}], null, 2))
        } 
    }
    getById(id) {
        let dataFile = fs.readFileSync("./src/componentes/productos.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile) 
        try{
            if (dataFileParse.find( p => p.id === id)){
                const product = dataFileParse.find( p => p.id === id);
                return product
            } else {
                const error = {error: 'ID de producto inexistente' }
                return error
            }
        } catch (err){
            console.log(err)
        }
    }
    upload(id,title,price,thumbnail){
        let dataFile = fs.readFileSync("./src/componentes/productos.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile)
            if (dataFileParse.find( p => p.id === id)){
                const newProduct = {
                    title,
                    price,
                    thumbnail,
                    id
                }
                const newArray = dataFileParse.filter(p => p.id !== id)
                newArray.unshift(newProduct)
                fs.writeFileSync("./src/componentes/productos.txt", JSON.stringify(newArray, null, 2))
                const productUploades = {
                    message: 'Producto modificado',
                    newProduct
                }
                return productUploades
            } else{
                const error = {error: 'ID de producto inexistente' }
                return error
            } 
        }
    deleteById(id){
        let dataFile = fs.readFileSync("./src/componentes/productos.txt", "utf-8")
        let dataFileParse = JSON.parse(dataFile)
            try{
                if ((dataFileParse.find(p => p.id === id))){
                    const newArray = dataFileParse.filter(p => p.id !== id)
                    fs.writeFileSync("./src/componentes/productos.txt", JSON.stringify(newArray, null, 2))
                    const supr = `Producto ID ${id} eliminado`
                    return supr
                    
                } else {
                    const error = 'ID de producto inexistente'
                    return error
                }
            } catch (err) {
                console.log(err)
            }
        } 
    }
