import { Producto } from "../Producto";

describe("Producto class tests", () =>{

    test ("Crear un Producto", () =>{
        let producto = new Producto(120,"Merienda","Empanadas","foto");
        let nombreProducto = producto.getNombre();
        let nombreEsperado = "Empanadas";
        expect(nombreProducto).toBe(nombreEsperado);
    });
    test ("Nombre null", () =>{
        let producto = new Producto(120,"Merienda",null,"foto");
        let expectedErrorMessage = "El nombre del producto no puede ser vacío";
        expect(() => producto.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Nombre undefined", () =>{
        let producto = new Producto(120,"Merienda",undefined,"foto");
        let expectedErrorMessage = "El nombre del producto no puede ser vacío";
        expect(() => producto.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Nombre vacio", () =>{
        let producto = new Producto(120,"Merienda","","foto");
        let expectedErrorMessage = "El nombre del producto no puede ser vacío";
        expect(() => producto.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Precio null", () =>{
        let producto = new Producto(null,"Merienda","Empanadas","foto");
        let expectedErrorMessage = "Precio no puede ser nulo";
        expect(() => producto.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Precio undefined", () =>{
        let producto = new Producto(undefined,"Merienda","Empanadas","foto");
        let expectedErrorMessage = "Precio no puede ser nulo";
        expect(() => producto.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Merienda esMerienda",()=>{
        let producto = new Producto(120,"Merienda","Empanadas","foto");
        expect(producto.esMerienda()).toBe(true);
    });
    test ("Menu !esMerienda",()=>{
        let producto = new Producto(120,"Menu","Empanadas","foto");
        expect(producto.esMerienda()).toBe(false);
    });
    test ("toString", () =>{
        let producto = new Producto(120,"Menu","Empanadas","foto");
        let toSting = producto.toString();
        let stringEsperado = "Empanadas";
        expect(toSting).toBe(stringEsperado);
    });
    test ("getPrecio",()=>{
        let producto = new Producto(120,"Menu","Empanadas","foto");
        let precioEsperado=120
        let precio=producto.getPrecio();
        expect(precio).toBe(precioEsperado);
    });
    test ("getLinkFoto",()=>{
        let producto = new Producto(120,"Menu","Empanadas","foto");
        let linkEsperado="foto"
        let link=producto.getLinkFoto();
        expect(link).toBe(linkEsperado);
    });
    test ("getMeriendaoMenu",()=>{
        let producto = new Producto(120,"Menu","Empanadas","foto");
        let menuEsperado="Menu"
        let menu=producto.getMeriendaOMenu();
        expect(menu).toBe(menuEsperado);
    });
    test ("getNombre",()=>{
        let producto = new Producto(120,"Menu","Empanadas","foto");
        let nombreProducto = producto.getNombre();
        let nombreEsperado = "Empanadas";
        expect(nombreProducto).toBe(nombreEsperado);
    });
    test ("niMeriendaNiMenu", () =>{
        let producto = new Producto(120,"otro","Empanadas","foto");
        let expectedErrorMessage = "Merienda o Menu";
        expect(() => producto.esValido()).toThrow(expectedErrorMessage);
    });
});