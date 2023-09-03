import {Cantina} from "../Cantina";
import {Producto} from '../Producto';
import {MenuDelDia} from "../MenuDelDia";
describe('Cantina class tests', () => {
    test ("Crear una Cantina", () =>{
        let cantina = new Cantina();
        let listaMenues= cantina.getListaMenues();
        expect(listaMenues.length).toBe(0);
    });
    test("getListaMerienda y agregarProducto", ()=>{
        let cantina= new Cantina();
        let producto = new Producto(120,"Merienda","gomets","foto");
        cantina.agregarProducto(producto);
        let listaMeriendas= cantina.getListaMeriendas();
        expect(listaMeriendas.length).toBe(1);
    });
    test("getListaMenu y agregarProducto", ()=>{
        let cantina= new Cantina();
        let producto = new Producto(120,"Menu","Pollo","foto");
        cantina.agregarProducto(producto);
        let listaMenues= cantina.getListaMenues();
        expect(listaMenues.length).toBe(1);
    });
    test("agregar producto repetido", ()=>{
        let cantina= new Cantina();
        let producto = new Producto(120,"Menu","Pollo","foto");
        cantina.agregarProducto(producto);
        let expectedErrorMessage="Producto Repetido";
        expect(() => cantina.agregarProducto(producto)).toThrow(expectedErrorMessage);
    });
    //tanto agregarPedido como sacarPedido como lo relacionado a lista socios esta implementado de manera simbolica
    test("agregar Menu del Dia",()=>{
        let cantina= new Cantina();
        let menu = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        cantina.agregarMenuDD(menu);
        let listaMenuDD=cantina.getListaMenuDD();
        expect(listaMenuDD.length).toBe(1);
    });
    test("agregar Menu del Dia para un dia q ya tiene menu",()=>{
        let cantina= new Cantina();
        let menu1 = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        let menu2 = new MenuDelDia("19/7/23","Milanesa","Pure","Fruta");
        cantina.agregarMenuDD(menu1);
        let expectedErrorMessage= "fecha repetida"
        expect(() => cantina.agregarMenuDD(menu2)).toThrow(expectedErrorMessage);
    });
    test("buscar Menu del Dia",()=>{
        let cantina= new Cantina();
        let menu1 = new MenuDelDia("19/7/23","Pollo","Arroz","Fruta");
        cantina.agregarMenuDD(menu1)
        let menu2= cantina.buscarMenuDia("19/7/23");
        expect(menu2).toBe(menu1);
    });
})