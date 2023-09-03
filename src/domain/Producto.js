export class Producto{
    _linkFoto
    _precio
    _meriendaOMenu
    _nombre
    constructor(precio,meriendaOMenu, nombrePlato,linkFoto){
        this._linkFoto=linkFoto;
        this._precio=precio;
        if(meriendaOMenu.toUpperCase()=="MERIENDA"){
            this._meriendaOMenu="Merienda";
        }else{
            if(meriendaOMenu.toUpperCase()=="MENU"){
                this._meriendaOMenu="Menu";
            }else{
                this._meriendaOMenu=meriendaOMenu;
            }
        }
        this._nombre=nombrePlato;
    }
    getLinkFoto(){
        return this._linkFoto;
    }
    getPrecio(){
        return this._precio;
    }
    getMeriendaOMenu(){
        return this._meriendaOMenu;
    }
    getNombre(){
        return this._nombre;
    }
    toString(){
        return this._nombre;
    }
    esMerienda(){
        if(this._meriendaOMenu=="Merienda"){
            return true;
        }
        return false;
    }
    esValido(){
        if (this._nombre === undefined || this._nombre === null || this._nombre === "") {
            throw new Error("El nombre del producto no puede ser vacío");
        }
        if (this._precio === undefined || this._precio === null || this._precio === "") {
            throw new Error("Precio no puede ser nulo");
          }
        if(this._meriendaOMenu=="Merienda" || this._meriendaOMenu=="Menu"){
        }else{
            throw new Error("Merienda o Menu");
        }
    }

}
