import Image from "next/image";

export default function HeaderComAcoes({
  className,
  iconeEsquerda,
  textoEsquerda = null,
  aoClicarElementoEsquerda,
  titulo,
  elementoDireita = null,
  aoClicarElementoDireita
}) {
  return (
    <div className={`cabecalhoComAcoes ${className}`}>
      {iconeEsquerda ? (
        <span>
          <Image
            src={iconeEsquerda}
            alt="icone Esquerda cabecalho com ações"
            onClick={aoClicarElementoEsquerda}
            width={25}
            height={25}
          />
        </span>
      ) : (
        textoEsquerda &&
        <span
          className="cabecalhoComAcoesTextoEsquerda"
          onClick={aoClicarElementoEsquerda}
        >
          {textoEsquerda}
        </span>
      )}
      <h3>{titulo}</h3>

      {elementoDireita && (
        <button
          type="button"
          className="btnAcaoDireita"
          onClick={aoClicarElementoDireita}
        >
          {elementoDireita}
        </button>
      )}

    </div>
  )
}