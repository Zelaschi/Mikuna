import {Comensal} from "../Comensal";

describe("Cantina class tests", () => {
    test ("Crear un Comensal", () =>{
        let comensal = new Comensal("Juan",4,"primaria");
        let nombreComensal = comensal.getNombre();
        let nombreEsperado = "Juan";
        expect(nombreComensal).toBe(nombreEsperado);
    });
    test ("Nombre null", () =>{
        let comensal = new Comensal(null,1,"primaria");
        let expectedErrorMessage = "El nombre del comensal no puede ser vacío";
        expect(() => comensal.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Nombre vacio", () =>{
        let comensal = new Comensal("",6,"primaria");
        let expectedErrorMessage = "El nombre del comensal no puede ser vacío";
        expect(() => comensal.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Nombre undefined", () =>{
        let comensal = new Comensal(undefined,5,"primaria");
        let expectedErrorMessage = "El nombre del comensal no puede ser vacío";
        expect(() => comensal.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Curso null", () =>{
        let comensal = new Comensal("Juan",null,"primaria");
        let expectedErrorMessage = "Curso mal iniciado";
        expect(() => comensal.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Curso undefined", () =>{
        let comensal = new Comensal("Juan",undefined,"secundaria");
        let expectedErrorMessage = "Curso mal iniciado";
        expect(() => comensal.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Curso vacio", () =>{
        let comensal = new Comensal("Juan","","primaria");
        let expectedErrorMessage = "Curso mal iniciado";
        expect(() => comensal.esValido()).toThrow(expectedErrorMessage);
    });
    test ("Comensal Valido", () =>{
        let comensal = new Comensal("Juan",2,"primaria");
        expect(comensal.esValido()).toBe(true);
    });
    test ("getNombre", () =>{
        let comensal = new Comensal("Juan",3,"primaria");
        let nombreComensal = comensal.getNombre();
        let nombreEsperado = "Juan";
        expect(nombreComensal).toBe(nombreEsperado);
    });
    test ("getCurso", () =>{
        let comensal = new Comensal("Juan",4,"primaria");
        let cursoComensal = comensal.getCurso();
        let cursoEsperado = "4to";
        expect(cursoComensal).toBe(cursoEsperado);
    });
    test ("toString", () =>{
        let comensal = new Comensal("Juan",4,"primaria");
        let toSting = comensal.toString();
        let stringEsperado = "Juan - 4to de Primaria";
        expect(toSting).toBe(stringEsperado);
    });


});