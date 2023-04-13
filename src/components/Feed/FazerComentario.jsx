import { Avatar } from "../Avatar";

export function FazerComentario({
  usuarioLogado
}) {
  return (
    <div className="containerFazerComentario">
      <Avatar src={usuarioLogado.avatar}/>
      <textarea
        rows={1}
        placeholder="Adicionar um comentário ..."
      ></textarea>
    </div>
  )
}