export function Button({
  tipo = 'button',
  texto,
  cor = 'primaria',
  desabilitado = false,
  onClick
}
) {
  return (
    <button
      type={tipo}
      className={`btn ${cor}`}
      disabled={desabilitado}
      onClick={onClick}
    >
      {texto}
    </button>
  )
}