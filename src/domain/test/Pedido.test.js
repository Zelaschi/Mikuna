import {Pedido} from "../Pedido"
import { Producto } from "../Producto";
import { Comensal } from "../Comensal";
describe("Pedido class tests", ()=>{
    test("crear un pedido",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let producto = new Producto(120,"Merienda","Empanadas","foto"); 
        let pedido= new Pedido("19/7/2023",  producto, comensal);
        let expectedFecha= "19/7/2023";
        let fecha= pedido.getFecha();
        expect(fecha).toBe(expectedFecha);
    });
    test("comensal null",()=>{
        let producto = new Producto(120,"Merienda","Empanadas","foto"); 
        let pedido= new Pedido("19/7/2023",  producto, null);
        let expectedErrorMessage = "comensal no puede ser vacio";
        expect(() => pedido.esValido()).toThrow(expectedErrorMessage);
    });
    test("comensal undefined",()=>{
        let producto = new Producto(120,"Merienda","Empanadas","foto"); 
        let pedido= new Pedido("19/7/2023",  producto, undefined);
        let expectedErrorMessage = "comensal no puede ser vacio";
        expect(() => pedido.esValido()).toThrow(expectedErrorMessage);
    });
    test("comensal vacio",()=>{
        let producto = new Producto(120,"Merienda","Empanadas","foto"); 
        let pedido= new Pedido("19/7/2023",  producto, "");
        let expectedErrorMessage = "comensal no puede ser vacio";
        expect(() => pedido.esValido()).toThrow(expectedErrorMessage);
    });
    test("producto null",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let pedido= new Pedido("19/7/2023",  null,comensal);
        let expectedErrorMessage = "item no puede ser vacio";
        expect(() => pedido.esValido()).toThrow(expectedErrorMessage);
    });
    test("producto undefined",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let pedido= new Pedido("19/7/2023",  undefined, comensal);
        let expectedErrorMessage = "item no puede ser vacio";
        expect(() => pedido.esValido()).toThrow(expectedErrorMessage);
    });
    test("producto vacio",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let pedido= new Pedido("19/7/2023",  "", comensal);
        let expectedErrorMessage = "item no puede ser vacio";
        expect(() => pedido.esValido()).toThrow(expectedErrorMessage);
    });
    test("fecha null",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let producto = new Producto(120,"Merienda","Empanadas","foto");  
        let pedido= new Pedido(null, producto, comensal);
        let expectedErrorMessage = "fecha no puede ser vacia";
        expect(() => pedido.esValido()).toThrow(expectedErrorMessage);
    });
    test("fecha undefined",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let producto = new Producto(120,"Merienda","Empanadas","foto");  
        let pedido= new Pedido(undefined, producto, comensal);
        let expectedErrorMessage = "fecha no puede ser vacia";
        expect(() => pedido.esValido()).toThrow(expectedErrorMessage);
    });
    test("fecha vacia",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let producto = new Producto(120,"Merienda","Empanadas","foto");  
        let pedido= new Pedido("", producto, comensal);
        let expectedErrorMessage = "fecha no puede ser vacia";
        expect(() => pedido.esValido()).toThrow(expectedErrorMessage);
    });
    test("getFecha",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let producto = new Producto(120,"Merienda","Empanadas","foto");  
        let pedido= new Pedido("19/7/2023", producto, comensal);
        let fechaEsperada="19/7/2023"
        let fechaObtendia = pedido.getFecha();
        expect(fechaObtendia).toBe(fechaEsperada)    
    });
    test("getItem",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let producto = new Producto(120,"Merienda","Empanadas","foto");  
        let pedido= new Pedido("19/7/2023", producto, comensal);
        let item = pedido.getItem();
        expect(item).toBe(producto);  
    });
    test("getComensal",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let producto = new Producto(120,"Merienda","Empanadas","foto");  
        let pedido= new Pedido("19/7/2023", producto, comensal);
        let comensalEsperado = pedido.getComensal();
        expect(comensalEsperado).toBe(comensal);  
    });
    test("toString",()=>{
        let comensal = new Comensal("Juan",4,"primaria");
        let producto = new Producto(120,"Merienda","Empanadas","foto");  
        let pedido= new Pedido("19/7/2023", producto, comensal);
        let toStringEsperado = "Juan - 4to de Primaria Empanadas";
        expect(pedido.toString()).toBe(toStringEsperado);  
    });
});