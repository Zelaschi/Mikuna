
export class Carrito{
    listaPedidosARealizar
    _totalCarrito
    constructor(){
        this.listaPedidosARealizar=[];
        this._totalCarrito=0;
    }
    estaVacio(){
        return this.listaPedidosARealizar.length==0;
    }
    vaciarCarrito(){
        this.listaPedidosARealizar=[];
        this._totalCarrito = 0;
    }
    estaEnCarrito(pedido){
        let esta = false;
        for (let i = 0; i < this.listaPedidosARealizar.length; i++) {
             if (this.listaPedidosARealizar[i].getFecha() === pedido.getFecha() && this.listaPedidosARealizar[i].getItem() === pedido.getItem() && this.listaPedidosARealizar[i].getComensal() === pedido.getComensal() && !pedido.getItem().esMerienda()) {
                  esta = true;
                  break; // Si se encuentra una coincidencia, se puede detener el bucle.
             }
        }
    return esta;
    }
    tieneAlmuerzoEseDia(pedido){
        let esta=false;
            for (let i = 0; i < this.listaPedidosARealizar.length; i++) {
                if(this.listaPedidosARealizar[i].getItem() === pedido.getItem() && this.listaPedidosARealizar[i].getComensal() === pedido.getComensal() && this.listaPedidosARealizar[i].getFecha() === pedido.getFecha() && !this.listaPedidosARealizar[i].getItem().esMerienda()){
                     esta = true;
                     break; // Si se encuentra una coincidencia, se puede detener el bucle.
                }
           }
           return esta;
    }   
    
    agregarAlCarrito(pedido){
        if(!this.estaEnCarrito(pedido)){
            if(this.tieneAlmuerzoEseDia(pedido)){
                alert("Ya tiene almuerzo en el carrito para ese dia!");
                return false;
            }else{
                this.listaPedidosARealizar.push(pedido);
                this._totalCarrito+=pedido.getPrecio();
                alert("Producto agregado al Carrito!");
            return true;
            }
        }else{
            alert("Pedido ya en carrito!");
            return false;
        }
    }
    sacarDelCarrito(pedido){
        for (let i = 0; i < this.listaPedidosARealizar.length; i++) {
            if (this.listaPedidosARealizar[i].getFecha() === pedido.getFecha() && this.listaPedidosARealizar[i].getItem() === pedido.getItem() && this.listaPedidosARealizar[i].getComensal() === pedido.getComensal()) {
                 this.listaPedidosARealizar.splice(i,1);
                 break; // Si se encuentra una coincidencia, se puede detener el bucle.
            }
       }
       this._totalCarrito-=pedido.getItem().getPrecio();
    }
    getTotal(){
        return this._totalCarrito;
    }
    getListaPedidosARealizar(){
        return this.listaPedidosARealizar;
    }
    
}