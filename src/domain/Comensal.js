export class Comensal{
    _numeroComensal
    _nombre;
    _curso;
    _primariaOSecundaria;

    constructor(nombre,curso,PoS){
        this._nombre=nombre;
        if(PoS.toUpperCase()=="SECUNDARIA"){
            this._primariaOSecundaria="Secundaria"
        }else{
            if(PoS.toUpperCase()=="PRIMARIA"){
            
                this._primariaOSecundaria="Primaria"
            }
        }
        switch(curso){
            case 1:
                this._curso="1ro";
            break;
            case 2:
                this._curso="2do";
            break;
            case 3:
                this._curso="3ro";
            break;
            case 4:
                this._curso="4to";
            break;                
            case 5:
                this._curso="5to";
            break;
            case 6:
                this._curso="6to";   
            break;
            default:
                this._curso=curso;
            break;
        }
    }
    esValido(){
        if (this._nombre === undefined || this._nombre === null || this._nombre === '') {
            throw new Error("El nombre del comensal no puede ser vacío");
        }
        if (this._curso === undefined || this._curso === null || this._curso<1 || this._curso>6) {
            throw new Error("Curso mal iniciado");
          }
          return true;
    }
    getNombre(){
        return this._nombre;
    }
    getCurso(){
        return this._curso;
    }

    toString(){
        return this._nombre + " - " + this._curso + " de "+ this._primariaOSecundaria;
    }
}