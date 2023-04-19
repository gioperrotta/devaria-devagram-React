import { useState } from "react";
import { Avatar } from "../Avatar";

export default function FazerComentario({ usuarioLogado, comentar }) {
  const [rows, setRows] = useState(1);
  const [comentario, setComentario] = useState('');

  const aoDigitarComentario = (e) => {
    const valorInput = e.target.value;
    setComentario(valorInput);
    setRows(valorInput.length <= 36 ? 1 : 2)
  }

  const fazerComnetario = () => {
    if (comentario.trim().length === 0 || !comentar) {
      return;
    }
    comentar(comentario);
  }

  const aoPrecionarTecla = (e) => {
    if (e.key === 'Enter') {
      fazerComnetario();
    }
  }

  return (
    <div className="containerFazerComentario">
      <Avatar src={usuarioLogado.avatar} />
      <textarea
        rows={rows}
        value={comentario}
        onChange={aoDigitarComentario}
        onKeyDown={aoPrecionarTecla}
        placeholder="Adicionar um comentário ...">
      </textarea>
      <button
        type="button"
        className="btnPublicacao desktop"
        onClick={fazerComnetario}
      >
        Publicar
      </button>
    </div>
  )
}