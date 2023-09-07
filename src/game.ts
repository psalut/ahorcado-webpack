type scoreType = {
  nombre: string;
  score: number;
};
export class Ahorcado {
  public palabra: string;
  public erroresPosibles: number;
  public erroresCometidos: number;
  public letrasErroneas: string[];
  public letrasCorrectas: string[];
  public score: number;
  public scores:scoreType[] = [];

  public palabrasAdivinadas: string[];
  public palabrasRestantes: string[] = ['pintura','pentagrama','frutilla','verdura','anillo','siesta','misterio','hoja','tetera','abeja','cargo','silueta','transportador','garrapata','esqueleto','paella','municipio'];

  constructor(palabra:string | null) {
    if (palabra) {
      this.palabra = palabra;
    } else {
      this.seleccionaPalabra();
    }
    this.erroresPosibles = 6;
    this.erroresCometidos = 0;
    this.letrasErroneas = [];
    this.letrasCorrectas = [];
    this.score = 0;
  }

  seleccionaPalabra(): void {
    const min = Math.ceil(0);
    const max = Math.floor(this.palabrasRestantes.length-1);
    const pos = Math.floor(Math.random() * (max - min + 1) + min);
    const elegida = this.palabrasRestantes[pos];

    this.palabra = elegida;
    this.palabrasRestantes.splice(pos, 1);
  }

  getPalabra(): string {
    return this.palabra;
  }

  arriesgarLetra(letraElegida: string): boolean | string {
    if (letraElegida.length > 1) {
      return 'Ingrese solo una letra.';
    }
    if (!this.esLetra(letraElegida)) {
      return 'Ingrese una letra válida.';
    }
    if (this.letrasCorrectas.includes(letraElegida) || this.letrasErroneas.includes(letraElegida)) {
      return 'Letra ya utilizada.';
    }
    
    if (this.palabra.includes(letraElegida)) {
      this.letrasCorrectas.push(letraElegida);
      if (this.getPalabraAdivinada()) {
        this.score = this.score + 10;
        return 'GANASTE';
      }
      return true;
    } else {
      this.letrasErroneas.push(letraElegida);
      this.erroresCometidos++;
      if (this.erroresCometidos === this.erroresPosibles) {
        return 'PERDISTE';
      }
      return false;
    }
  }

  getPalabraAdivinada(): boolean {
    return this.palabra.split('').every(letter => this.letrasCorrectas.includes(letter));
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

  returnScore(): number {
    return this.score;
  }

  restartGame(): void {
    this.palabra = '';
    this.erroresCometidos = 0;
    this.letrasErroneas = [];
    this.letrasCorrectas = [];
    this.seleccionaPalabra();
  }

  setScore(name:string): void {
    this.scores.push({nombre: name, score: this.score});
  }

  getScores():scoreType[] {
    const sorted = this.scores.sort((a, b) => b.score - a.score);
    return sorted;
  }

  cleanScore(): void {
    this.score = 0;
  }
}