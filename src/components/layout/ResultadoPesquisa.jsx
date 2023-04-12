import { Avatar } from "../Avatar";

export function ResultadoPesquisa({  avatar, email, nome, onClick, id }) {
  return (
    <div className="rsultadoPesquisa" onClick={()=> onClick(id)}>
      <Avatar src={avatar} />
      <div className="informacoesUsuario">
        <strong>{nome}</strong>
        <span>{email}</span>
      </div>
    </div>
  )
}