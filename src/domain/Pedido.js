export class Pedido{
    _fecha
    _item
    _comensal
    _pedidoId
    constructor(fecha,item,comensal, pedidoId){
        this._fecha= fecha;
        this._item=item;
        this._comensal=comensal;
        this._pedidoId=pedidoId
    }
    esValido(){
        if (this._fecha === undefined || this._fecha === null || this._fecha === '') {
            throw new Error("fecha no puede ser vacia");
        }
        if (this._item === undefined || this._item === null|| this._item==='') {
            throw new Error("item no puede ser vacio");
          }
          if (this._comensal === undefined || this._comensal === null|| this._comensal==='') {
            throw new Error("comensal no puede ser vacio");
          }
    }
    getPedidoId(){
        return this._pedidoId();
    }
    getFecha(){
        return this._fecha
    }
    getItem(){
        return this._item;
    }
    getPrecio(){
        return this._item.getPrecio();
    }
    getComensal(){
        return this._comensal.getNombre();
    }
    toString(){
        return this._comensal + " "+ this._item;
    }
}