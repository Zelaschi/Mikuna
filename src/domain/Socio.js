export class Socio {

    _nombre;
    _saldo;
    listaComensales;
    _definido;
    listaPedidos;
    constructor(unNombre,saldo){
        this._definido=false;
        this._nombre=unNombre;
        this.listaComensales=[];
        this._saldo=saldo;
        this.listaPedidos=[];
    }
    esValido(){
        if (this._nombre === undefined || this._nombre === null || this._nombre === '') {
            throw new Error("El nombre del comensal no puede ser vacío");
        }
        if (this._saldo === undefined || this._saldo === null) {
            throw new Error("saldo mal iniciado");
          }
    }
    agregarSaldo(cuanto){
        this._saldo+=cuanto;
    }
    restarSaldo(cuanto){
        this._saldo-=cuanto;
    }
    sacarPedido(indice){
        this.listaPedidos.splice(indice-1,1);
    }
    agregarPedido(pedido){
        this.listaPedidos.push(pedido);
    }
    getPedidos(){
        return this.listaPedidos;
    }
    buscarComensal(pos){
        return this.listaComensales[pos-1];
    }
    setNombre(unNombre){
        this._definido=true;
        this._nombre=unNombre;
    }
    getNombre(){
        return this._nombre;
    }
    getDefinido(){
        return this._definido;
    }
    setDefinido(){
        this._definido=true;
    }
    getSaldo(){
        return this._saldo;
    }
    estaComensal(unComensal){
        let esta = false;
        for (let elem of this.listaComensales){
            if (elem.getNombre().toUpperCase() == unComensal.getNombre().toUpperCase()){
                esta= true;
            }
        }
        return esta;
    }
    agregarComensal(unComensal){
        if(!this.estaComensal(unComensal)){
            this.listaComensales.push(unComensal);
        }else{
            throw new Error("Comensal Repetido!");
        }

    }
    darComensales(){
        return this.listaComensales;
    }
    
    eliminarComensal(pos){
        this.listaComensales.splice(pos-1,1);
    }
}