
export class Carrito{
    listaComensal
    fechasPedidos
    listaProductos
    _totalCarrito
    constructor(){
        this.listaComensal=[];
        this.fechasPedidos=[];
        this.listaProductos=[];
        this._totalCarrito=0;
    }
    estaVacio(){
        return this.listaProductos.length==0;
    }
    vaciarCarrito(){
        this.listaComensal = [];
        this.fechasPedidos = [];
        this.listaProductos = [];
        this._totalCarrito = 0;
    }
    estaEnCarrito(comensal,fecha,producto){
        let esta = false;
        for (let i = 0; i < this.listaProductos.length; i++) {
             if (this.listaComensal[i] === comensal && this.listaProductos[i] === producto && this.fechasPedidos[i] === fecha&& !producto.esMerienda()) {
                  esta = true;
                  break; // Si se encuentra una coincidencia, se puede detener el bucle.
             }
        }
    return esta;
    }
    tieneAlmuerzoEseDia(comensal,fecha,producto){
        let esta=false;
            for (let i = 0; i < this.listaProductos.length; i++) {
                if (this.listaComensal[i] === comensal && this.fechasPedidos[i] === fecha && !producto.esMerienda()) {
                     esta = true;
                     break; // Si se encuentra una coincidencia, se puede detener el bucle.
                }
           }
           return esta;
    }   
    
    agregarAlCarrito(comensal,fecha,producto){
        if(!this.estaEnCarrito(comensal,fecha,producto)){
            if(this.tieneAlmuerzoEseDia(comensal,fecha,producto)){
                alert("Ya tiene almuerzo en el carrito para ese dia!");
                return false;
            }else{
                this.listaComensal.push(comensal);
                this.fechasPedidos.push(fecha);
                this.listaProductos.push(producto);
                this._totalCarrito+=producto.getPrecio();
                alert("Producto agregado al Carrito!");
            return true;
            }
        }else{
            alert("Pedido ya en carrito!");
            return false;
        }
    }
    sacarDelCarrito(comensal,fecha,producto){
        for (let i = 0; i < this.listaProductos.length; i++) {
            if (this.listaComensal[i] === comensal && this.listaProductos[i] === producto && this.fechasPedidos[i] === fecha) {
                 this.listaComensal.splice(i,1);
                 this.listaProductos.splice(i,1);
                 this.fechasPedidos.splice(i,1);
                 break; // Si se encuentra una coincidencia, se puede detener el bucle.
            }
       }
       this._totalCarrito-=producto.getPrecio();
    }
    getTotal(){
        return this._totalCarrito;
    }
    getListaComensal(){
        return this.listaComensal;
    }
    getListaProductos(){
        return this.listaProductos;
    }
    getFechasPedidos(){
        return this.fechasPedidos;
    }
    
}