import { useState } from "react"
import { useRouter } from "next/router"

import HeaderComAcoes from "@/components/HeaderComAcoes"
import UploadImage from "@/components/UploadImage"
import comAutorizacao from "@/hoc/comAutorizacao"
import { Button } from "@/components/Button"
import imgPublicacaoVazia from '../../../public/images/PublicacaoVazia.svg'
import imgSetaEsquerda from '../../../public/images/voltar.svg'
import { FeedService } from "@/services/FeedService"

const limiteDescricao = 255
const descricaoMinima = 3

const feedService = new FeedService()

function Publicacao() {
  const [etapaAtual, setEtapaAtual] = useState(1)
  const [image, setImage] = useState()
  const [inputImagem, setInputImagem] = useState()
  const [descricao, setDescricao] = useState('')

  const router = useRouter()

  const estaNaEtapaUm = () => etapaAtual === 1

  const obterTextoEsquerdaCabecalho = () => {
    if (estaNaEtapaUm() && image) {
      return 'Cancelar'
    }
    return '' 
  }

  const obterTextoDireitaCabecalho = () => {
    if (!image) {
      return ''
    }
    if (estaNaEtapaUm()) {
      return 'Avançar'
    }
    return 'Compartilhar' 
  }

  const aoClicarAcaoEsquerda = () => {
    if (estaNaEtapaUm) {
      inputImagem.value = null
      setImage(null)
      return
    }
    setEtapaAtual(1)
  }

  const aoClicarAcaoDireita = () => {
    if (estaNaEtapaUm()) {
      setEtapaAtual(2)
      return
    }
    publicar()
  }

  const obterClassNameCabecalho = () => {
    if (estaNaEtapaUm()) {
      return 'primeiraEtapa'
    }
    return 'segundaEtapa'
  }

  const publicar = async () => {
    try {
      if (!validarFormulario()) {
        alert('A descrição precisa de pelo menos 3 caracters e a imagem selecionada ')
        return
      }

      const corpoPublicacao = new FormData()
      corpoPublicacao.append('descricao', descricao)
      corpoPublicacao.append('file', image.arquivo)

      await feedService.fazerPublicacao(corpoPublicacao)
      router.push('/')

    } catch (error) {
      alert('Erro ao salvar publicação!')
    }
  }

  const validarFormulario = () => {
    return (
      descricao.length >= descricaoMinima
      && image?.arquivo
    )
  }

  return (

    <div className="paginaPublicacao largura30pctDesktop">
      <HeaderComAcoes
        titulo='Nova Publicação'
        className={obterClassNameCabecalho()}
        iconeEsquerda={estaNaEtapaUm() ? null : imgSetaEsquerda}
        textoEsquerda={obterTextoEsquerdaCabecalho()}
        aoClicarElementoEsquerda={aoClicarAcaoEsquerda}
        elementoDireita={obterTextoDireitaCabecalho()}
        aoClicarElementoDireita={aoClicarAcaoDireita}
      />
      <hr className="linhaDivisoria" />
      <div className="conteudoPaginaPublicacao ">
        {estaNaEtapaUm()
          ? (
            <div className="primeiraEtapa">
              <UploadImage
                setImage={setImage}
                aoSetarAReferencia={setInputImagem}
                imagePreviewClassName={!image ? 'previewImagemPublicacao' : 'previewImagemSelecionada'}
                imagePreview={image?.preview || imgPublicacaoVazia.src}
              />
              <span className="desktop textoDragAndDrop">Arraste sua Imagem aqui!</span>
              <Button
                texto='Selecionar uma imagem'
                onClick={() => inputImagem?.click()}
              />
            </div>
          ) : (
            <>
              <div className="segundaEtapa">
                <UploadImage
                  setImage={setImage}
                  imagePreview={image?.preview}
                />

                <textarea
                  rows={5}
                  value={descricao}
                  placeholder='Escreva uma legenda...'
                  onChange={e => setDescricao(e.target.value)}
                ></textarea>

              </div>
              <hr className="linhaDivisoria" />
            </>
          )}


      </div>

    </div>
  )
}

export default comAutorizacao(Publicacao)