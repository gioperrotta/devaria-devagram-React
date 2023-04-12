import { useEffect, useState } from "react"
import Postagem from "./Postagem";

export default function Feed ({usuarioLogado}) {
  const [listaDePostagens, setListaDePostagens] = useState([]);

  useEffect(() => {
    setListaDePostagens([
      {
        id: '1',
        usuario: {
          id: '1',
          nome: 'Douglas',
          avatar: null
        },
        fotoDoPost: '',
        descricao: '',
        curtidas: [],
        comentarios: [
          {
            nome: 'Fulano',
            mensagem: 'Muito Leagal'
          }
        ]
      }
    ])
  }, [usuarioLogado])

  return (
    <div className="feedContainer">
      {listaDePostagens.map(dadosPostagem => (
        <Postagem key={dadosPostagem.id} {...dadosPostagem}/>
      ))}
    </div>
  )
}