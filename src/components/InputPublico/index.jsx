import Image from "next/image";

export function InputPublico({
  iconeInput,
  tipo,
  texto,
  valor= '',
  exibirMensagemValidacao = false,
  mensagemValidacao = '',
  aoAlterarValor
}) {
  return (
    <div className="inputPublicoContainer">
      <div className="inputPublico">
        <Image
          className="iconeInputPublico"
          src={iconeInput}
          alt='icone do input'
          width={20}
          height={20}
        />
        <input
          type={tipo}
          placeholder={texto}
          value={valor}
          onChange={aoAlterarValor}
        />
      </div>
      {exibirMensagemValidacao && <p className="mensagemValidacao">{mensagemValidacao}</p> }
    </div>
  )

}