import {Socio} from "../Socio";
import {Comensal} from "../Comensal"
import {Pedido} from "../Pedido"
import {Producto} from "../Producto"

describe("Socio class tests", ()=>{
    test ("Crear un Socio", () =>{
        let socio = new Socio("Tomas Zelaschi",2000);
        let nombreSocio = socio.getNombre();
        let nombreEsperado = "Tomas Zelaschi";
        expect(nombreSocio).toBe(nombreEsperado);
    });
    test ("Nombre null", () =>{
        let socio = new Socio(null,2000);
        let expectedErrorMessage = "El nombre del comensal no puede ser vacío";
        expect(() => socio.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Nombre vacio", () =>{
        let socio = new Socio("",2000);
        let expectedErrorMessage = "El nombre del comensal no puede ser vacío";
        expect(() => socio.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Nombre undefined", () =>{
        let socio = new Socio(undefined,2000);
        let expectedErrorMessage = "El nombre del comensal no puede ser vacío";
        expect(() => socio.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Saldo null", () =>{
        let socio = new Socio("Tomas Zelaschi",null);
        let expectedErrorMessage = "saldo mal iniciado";
        expect(() => socio.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Saldo undefined", () =>{
        let socio = new Socio("Tomas Zelaschi",undefined);
        let expectedErrorMessage = "saldo mal iniciado";
        expect(() => socio.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Agregar Saldo", () =>{
        let socio = new Socio("Tomas Zelaschi",200);
        socio.agregarSaldo(200)
        let saldoEsperado=400;
        let saldo=socio.getSaldo();
        expect(saldo).toBe(saldoEsperado);
    });
    test ("Agregar Saldo Cero", () =>{
        let socio = new Socio("Tomas Zelaschi",200);
        socio.agregarSaldo(0)
        let saldoEsperado=200;
        let saldo=socio.getSaldo();
        expect(saldo).toBe(saldoEsperado);
    });
    test ("Agregar Saldo Negativo", () =>{
        let socio = new Socio("Tomas Zelaschi",200);
        socio.agregarSaldo(-200)
        let saldoEsperado=0;
        let saldo=socio.getSaldo();
        expect(saldo).toBe(saldoEsperado);
    });
    test ("Restar Saldo", () =>{
        let socio = new Socio("Tomas Zelaschi",200);
        socio.restarSaldo(200)
        let saldoEsperado=0;
        let saldo=socio.getSaldo();
        expect(saldo).toBe(saldoEsperado);
    });
    test ("Restar Saldo Cero", () =>{
        let socio = new Socio("Tomas Zelaschi",200);
        socio.restarSaldo(0)
        let saldoEsperado=200;
        let saldo=socio.getSaldo();
        expect(saldo).toBe(saldoEsperado);
    });
    test ("Restar Saldo Negativo", () =>{
        let socio = new Socio("Tomas Zelaschi",200);
        socio.restarSaldo(-200)
        let saldoEsperado=400;
        let saldo=socio.getSaldo();
        expect(saldo).toBe(saldoEsperado);
    });
    test("Agregar Pedido", ()=>{
        let socio = new Socio("Tomas Zelaschi",200);
        let comensal= new Comensal("Juan",4,"Primaria");
        let producto= new Producto (120, "Merienda","Nuggets","Foto");
        let pedido= new Pedido("19/7/23", producto, comensal);
        socio.agregarPedido(pedido);
        expect(socio.getPedidos().length).toBe(1);
    });
    //test pedido repetido no se hace porque pedidos se agregan por backend.
    test("Sacar Pedido", ()=>{
        let socio = new Socio("Tomas Zelaschi",200);
        let comensal= new Comensal("Juan",4,"Primaria");
        let producto= new Producto (120, "Merienda","Nuggets","Foto");
        let pedido= new Pedido("19/7/23", producto, comensal);
        socio.agregarPedido(pedido);
        socio.sacarPedido(1);
        expect(socio.getPedidos().length).toBe(0);
    });
    test("Agregar Comensal", ()=>{
        let socio = new Socio("Tomas Zelaschi",200);
        let comensal= new Comensal("Juan",4,"Primaria");
        socio.agregarComensal(comensal);
        expect(socio.estaComensal(comensal)).toBe(true);
    });
    test("Agregar Comensal Repetido", ()=>{
        let socio = new Socio("Tomas Zelaschi",200);
        let comensal= new Comensal("Juan",4,"Primaria");
        socio.agregarComensal(comensal);
        let expectedErrorMessage="Comensal Repetido!";
        expect(() => socio.agregarComensal(comensal)).toThrow(expectedErrorMessage);
    });
    
    //hacer
    test("buscar Comensal", ()=>{
        let socio = new Socio("Tomas Zelaschi",200);
        let comensal= new Comensal("Juan",4,"Primaria");
        socio.agregarComensal(comensal);
        let comensalBuscado=socio.buscarComensal(1);
        expect(comensalBuscado).toBe(comensal);
    });
    test("darComensales", ()=>{
        let socio = new Socio("Tomas Zelaschi",200);
        let comensal= new Comensal("Juan",4,"Primaria");
        socio.agregarComensal(comensal);
        let listaCom=socio.darComensales();
        expect(listaCom.length).toBe(1);
    });
    test("eliminar comensal", ()=>{
        let socio = new Socio("Tomas Zelaschi",200);
        let comensal= new Comensal("Juan",4,"Primaria");
        socio.agregarComensal(comensal);
        socio.eliminarComensal(1);
        let listaCom=socio.darComensales();
        expect(listaCom.length).toBe(0);
    });
    test("definir", ()=>{
        let socio = new Socio("Tomas Zelaschi",200);
        socio.setDefinido();
        let expected=true;
        expect(socio.getDefinido()).toBe(expected);
    });
    test("Set Nombre", ()=>{
        let socio = new Socio("",200);
        socio.setNombre("Tomas")
        let expected=true
        expect(socio.getDefinido()).toBe(expected);
    });
});