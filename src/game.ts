export class Ahorcado {
  public palabra: string;
  public erroresPosibles: number;
  public erroresCometidos: number;
  public letrasErroneas: string[];
  public letrasCorrectas: string[];

  constructor(puntaje: string, erroresPosibles: number) {
    this.palabra = puntaje;
    this.erroresPosibles = erroresPosibles;
    this.erroresCometidos = 0;
    this.letrasErroneas = [];
    this.letrasCorrectas = [];
  }

  arriesgarPalabra(palabraElegida: string): string {
    if (palabraElegida === this.palabra) {
      return "GANASTE";
    } else {
      return "PERDISTE";
    }
  }

  arriesgarLetra(letraElegida: string): boolean | string {
    if (letraElegida.length > 1) {
      return "Ingrese solo una letra.";
    }
    if (!this.esLetra(letraElegida)) {
      return "Ingrese una letra válida.";
    }
    if (this.letrasCorrectas.includes(letraElegida) || this.letrasErroneas.includes(letraElegida)) {
      return "Letra ya utilizada.";
    }

    if (this.palabra.includes(letraElegida)) {
      this.letrasCorrectas.push(letraElegida);
      return true;
    } else {
      this.letrasErroneas.push(letraElegida);
      this.erroresCometidos++;
      if (this.erroresCometidos === this.erroresPosibles) {
        return "PERDISTE";
      }
      return false;
    }
  }

  getErrores(): number {
    return this.erroresCometidos;
  }

  esLetra(char: string): boolean {
    return /^[a-zA-Z]$/.test(char);
  }

  returnLetrasErroneas(): string[] {
    return this.letrasErroneas;
  }

  returnLetrasCorrectas(): string[] {
    return this.letrasCorrectas;
  }

  returnVidasRestantes(): number {
    return this.erroresPosibles - this.erroresCometidos;
  }
}