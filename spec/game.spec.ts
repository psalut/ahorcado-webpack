import 'jasmine';
import { Ahorcado } from "../src/game";

describe("arriesgar letra", () => {

  it("should return true", () => {
    let game = new Ahorcado("pelota");
    expect(game.arriesgarLetra('e')).toBe(true);
  });

  it("should return false", () => {
    let game = new Ahorcado("pelota");
    expect(game.arriesgarLetra('b')).toBe(false);
  });
  
});

describe("mostrar cantidad de errores cometidos", () => {

  it("should return 1 error", () => {
    let game = new Ahorcado("pelota");
    game.arriesgarLetra('q');
    expect(game.getErrores()).toBe(1);
  });

  it("should return 2 errors", () => {
    let game = new Ahorcado("pelota");
    game.arriesgarLetra('q');
    game.arriesgarLetra('w');

    expect(game.getErrores()).toBe(2);
  });
  
});

describe("arriesgo 6 letras y pierdo", () => {
  it("should return PERDISTE", () => {
    let game = new Ahorcado("pelota");
    game.arriesgarLetra('q');
    game.arriesgarLetra('w');
    game.arriesgarLetra('s');
    game.arriesgarLetra('u');
    game.arriesgarLetra('y');
    expect(game.arriesgarLetra('k')).toBe("PERDISTE");
  });
});

describe("quiero volver a usar una letra que ya arriesgué", () => {
  it("should return 'Letra ya utilizada.'", () => {
    let game = new Ahorcado("pelota");
    game.arriesgarLetra('k');
    expect(game.arriesgarLetra('k')).toBe("Letra ya utilizada.");
  });
});

describe("quiero ingresar dos letras a la vez", () => {
  it("should return 'Ingrese solo una letra.'", () => {
    let game = new Ahorcado("pelota");
    expect(game.arriesgarLetra('kw')).toBe("Ingrese solo una letra.");
  });
});

describe("quiero ingresar un caracter no valido", () => {
  it("should return 'Ingrese una letra válida.'", () => {
    let game = new Ahorcado("pelota");
    expect(game.arriesgarLetra('3')).toBe("Ingrese una letra válida.");
  });
});

describe("quiero ver las letras erroneas que ya ingresé", () => {
  it("should return 'a, b, c, d'", () => {
    let game = new Ahorcado("pelota");
    game.arriesgarLetra('a');
    game.arriesgarLetra('b');
    game.arriesgarLetra('c');
    expect(game.returnLetrasErroneas()).toEqual(['b','c']);
  });
});

describe("quiero ver las letras correctas que ya ingresé", () => {
  it("should return 'a, b, c, d'", () => {
    let game = new Ahorcado("pelota");
    game.arriesgarLetra('a');
    game.arriesgarLetra('b');
    game.arriesgarLetra('c');
    expect(game.returnLetrasCorrectas()).toEqual(['a']);
  });
});

describe("quiero ver las vidas que me quedan", () => {
  it("should return 3", () => {
    let game = new Ahorcado("pelota");
    game.arriesgarLetra('b');
    game.arriesgarLetra('c');
    game.arriesgarLetra('d');

    expect(game.returnVidasRestantes()).toBe(3);
  });
});

describe("quiero que seleccione una palabra del listado de palabras", () => {
  it("should return a word", () => {
    let game = new Ahorcado(null);
    const resultado = game.getPalabra();
    expect(resultado).not.toBeNull();
    expect(typeof resultado).toBe("string");
  });
});

describe("quiero que al adivinar una palabra el puntaje se incremente en diez", () => {
  it("should return a word", () => {
    let game = new Ahorcado('palabra');
    const inicial = game.returnScore();
    expect(inicial).toBe(0);

    game.arriesgarLetra('p');
    game.arriesgarLetra('a');
    game.arriesgarLetra('l');
    game.arriesgarLetra('b');
    game.arriesgarLetra('r');

    const final = game.returnScore();
    expect(final).toBe(10);
  });
});