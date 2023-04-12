import Link from "next/link";
import { Avatar } from "../Avatar";


export default function Postagem({
  usuario
}) {
  return (
    <div className="postagem">
      <Link href={`/perfil/$usuario.id`} >
        <section className="headerPostagem">
          <Avatar src={usuario.avatar}/>
          <strong>{usuario.nome}</strong>
        </section>
      </Link>

    </div>
  )
}