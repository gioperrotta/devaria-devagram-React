import { useEffect, useState } from "react"
import Postagem from "./Postagem";

export default function Feed({ usuarioLogado }) {
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
        fotoDoPost: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4ibWyks8RYdoesZ2LRzJIcyu-rFhbNfqLow&usqp=CAU',
        descricao: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        curtidas: [],
        comentarios: [
          {
            nome: 'Fulano',
            mensagem: 'Muito Leagal'
          },
          {
            nome: 'Fulano de Tal',
            mensagem: 'Muito Leagal Fulano de Tal'
          },
          {
            nome: 'Fulano da Esquina',
            mensagem: 'Muito Leagal Fulano da Esquina'
          }
        ]
      },
      {
        id: '2',
        usuario: {
          id: '2',
          nome: 'Giovanni',
          avatar: null
        },
        fotoDoPost: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6g9IA03Kp0MlFHT_NdPXjIz8C9RP9RMTm-A&usqp=CAU',
        descricao: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas et similique fugit minima, doloribus veniam sapiente nisi at quas eius dicta laboriosam, sint nemo nihil dolores animi neque omnis ipsam?',
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
    <div className="feedContainer largura30pctDesktop">
      {listaDePostagens.map(dadosPostagem => (
        <Postagem
          key={dadosPostagem.id}
          {...dadosPostagem}
          usuarioLogado={usuarioLogado}
        />
      ))}
    </div>
  )
}