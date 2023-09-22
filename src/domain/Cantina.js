export class Cantina {
    idPedido
    _listaPedidos
    listaMenues
    listaMeriendas
    _listaSocios
    listaMenuesDelDia
    constructor(){
        this._listaPedidos=[];
        this.listaMenues=[];
        this.listaMeriendas=[];
        this._listaSocios=[];
        this.listaMenuesDelDia=[];
        this.idPedido = 0;
    }
    sacarPedido(indice){
        this._listaPedidos.splice(indice-1,1);
    }
    agregarPedido(pedido){
        this._listaPedidos.push(pedido);
    }
    getListaMenuDD(){
        return this.listaMenuesDelDia;
    }
    buscarMenuDia(unDia){
        let ret;
        for (let elem of this.listaMenuesDelDia){
            if((elem.getFecha())==unDia){
                return elem;
            }
        }
        return false;
    }
    estaMerienda(unaMerienda){
        let esta = false;
        for (let elem of this.listaMenues){
            if (elem.getNombre().toUpperCase() == unaMerienda.getNombre().toUpperCase()){
                esta= true;
            }
        }
        return esta;
    }
    estaMenu(unMenu){
        let esta = false;
        for (let elem of this.listaMeriendas){
            if (elem.getNombre().toUpperCase() == unMenu.getNombre().toUpperCase()){
                esta= true;
            }
        }
        return esta;
    }
    agregarProducto(unProducto){
            if(!this.estaMerienda(unProducto)&&!this.estaMenu(unProducto)){
                if(unProducto.esMerienda()){
                    this.listaMeriendas.push(unProducto);
                }else{
                    this.listaMenues.push(unProducto);
                }
            }else{
                throw new Error('Producto Repetido');
            }
    }
    estaFecha(fecha){
        let esta=false;
        for (let elem of this.listaMenuesDelDia){
            if(elem.getFecha()== fecha){
                esta=true;
            }
        }
        return esta;
    }
    estaMenu(unMenu){
        let esta = false;
        for (let elem of this.listaMenuesDelDia){
            if (elem.getFecha() == unMenu.getFecha()){
                esta= true;
            }
        }
        return esta;
    }
    agregarMenuDD(unMenu){
        if(!this.estaMenu(unMenu)){
            this.listaMenuesDelDia.push(unMenu);
        }else{
            throw new Error("fecha repetida");
        }
    }
    getListaMeriendas(){
        return this.listaMeriendas;
    }
    getListaMenues(){
        return this.listaMenues;
    }
    getPedidoId(){
        let idPedido= this.idPedido;
        this.idPedido++;
        return idPedido;
    }
}

