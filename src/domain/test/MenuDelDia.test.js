import { MenuDelDia } from "../MenuDelDia";

describe("Menu del Dia class tests", ()=>{
    test ("Crear un MenuDD", () =>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        let nombre = menu.getMenu();
        let menuEsperado = "Pollo";
        expect(nombre).toBe(menuEsperado);
    });
    test ("menu null", () =>{
        let menu = new MenuDelDia("19/7/23",null,"Arroz","Fruta");
        let expectedErrorMessage = "menu no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test ("menu vacio", () =>{
        let menu = new MenuDelDia("19/7/23","","Arroz","Fruta");
        let expectedErrorMessage = "menu no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test ("menu undefined", () =>{
        let menu = new MenuDelDia("19/7/23",undefined,"Arroz","Fruta");
        let expectedErrorMessage = "menu no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test ("guarnicion null", () =>{
        let menu = new MenuDelDia("19/7/23","Pollo",null,"Fruta");
        let expectedErrorMessage = "guarnicion no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test ("guarnicion vacio", () =>{
        let menu = new MenuDelDia("19/7/23","Pollo","","Fruta");
        let expectedErrorMessage = "guarnicion no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test ("guarnicion undefined", () =>{
        let menu = new MenuDelDia("19/7/23","Pollo",undefined,"Fruta");
        let expectedErrorMessage = "guarnicion no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test ("fecha null", () =>{
        let menu = new MenuDelDia(null,"Pollo","Arroz","Fruta");
        let expectedErrorMessage = "fecha no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });

    test ("fecha vacio", () =>{
        let menu = new MenuDelDia("","Pollo","Arroz","Fruta");
        let expectedErrorMessage = "fecha no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test ("fecha undefined", () =>{
        let menu = new MenuDelDia(undefined,"Pollo","Arroz","Fruta");
        let expectedErrorMessage = "fecha no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test ("postre null", () =>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz",null);
        let expectedErrorMessage = "postre no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test ("postre vacio", () =>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz","");
        let expectedErrorMessage = "postre no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test ("postre undefined", () =>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz",undefined);
        let expectedErrorMessage = "postre no puede ser vacio";
        expect(() => menu.esValido()).toThrow(expectedErrorMessage);
    });
    test("esMerienda",()=>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        expect(menu.esMerienda()).toBe(false);
    });
    test("getMenu",()=>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        let nombre = menu.getMenu();
        let menuEsperado = "Pollo";
        expect(nombre).toBe(menuEsperado);
    });
    
    test("getGuarnicion",()=>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        let guar = menu.getGuarnicion();
        let guarEsperado = "Arroz";
        expect(guar).toBe(guarEsperado);
    });
    test("getPostre",()=>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        let post = menu.getPostre();
        let postEsperado = "Fruta";
        expect(post).toBe(postEsperado);
    });
    test("getPrecio",()=>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        let precio = menu.getPrecio();
        let precioEsperado = 250;
        expect(precio).toBe(precioEsperado);
    });
    test("getFecha",()=>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        let fecha = menu.getFecha();
        let fechaEsperado = "19/7/23";
        expect(fecha).toBe(fechaEsperado);
    });
    test("toString",()=>{
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        let string = menu.toString();
        let stringEsperado = "Pollo";
        expect(string).toBe(stringEsperado);
    });

});