
export class MenuDelDia{
    _fecha;
    _menu;
    _guarnicion;
    _postre;
    _precio;
    constructor(fecha,menu,guarnicion,postre){
        this._fecha=fecha;
        this._menu=menu;
        this._guarnicion=guarnicion;
        this._postre=postre;
        this._precio=250;
    }
    esValido(){
        if (this._fecha === undefined || this._fecha === null || this._fecha === '') {
            throw new Error("fecha no puede ser vacio");
        }
        if (this._guarnicion === undefined || this._guarnicion === null || this._guarnicion==="") {
            throw new Error("guarnicion no puede ser vacio");
        } 
        if (this._postre === undefined || this._postre === null || this._postre==="") {
            throw new Error("postre no puede ser vacio");
        }
        if (this._menu === undefined || this._menu === null || this._menu==="") {
            throw new Error("menu no puede ser vacio");
        }
    }
    esMerienda(){
        return false;
    }
    getMenu(){
        return this._menu;
    }
    getGuarnicion(){
        return this._guarnicion;
    }
    getPostre(){
        return this._postre;
    }
    getPrecio(){
        return this._precio;
    }
    getFecha(){
        return this._fecha;
    }
    toString(){
        return this._menu;
    }
}