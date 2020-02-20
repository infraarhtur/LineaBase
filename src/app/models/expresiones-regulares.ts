export class ExpresionesRegulares {
  public static readonly soloLetrasYNumeros = /[a-zA-Z0-9]+/iu;
  public static readonly noEsLetraNiNumero = /[^a-zA-Z0-9]/giu;
  public static readonly noEsCaracterUsuario = /[^a-zA-Z0-9._]/giu;
  public static readonly noEsNumero = /[^0-9]/giu;
  public static readonly noHayInformacion = /No\s+hay\s+informaci/iu;
  public static readonly esErrorControlado = /\|?#(Error|Info|Warning)\|?/iu;
  public static readonly noEsNumeroDecimal = /[^0-9.]/giu;
}
