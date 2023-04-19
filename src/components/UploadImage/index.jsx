/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react"

export default function UploadImage({
  className = '',
  setImage,
  imagePreview,
  imagePreviewClassName = '',
  aoSetarAReferencia
}) {
  const referenciaInput = useRef(null);

  useEffect(() => {
    if (!aoSetarAReferencia) {
      return;
    }
    aoSetarAReferencia(referenciaInput?.current);

  }, [referenciaInput?.current])

  const abrirSeletorArquivos = () => {
    referenciaInput?.current?.click()
  }

  const obterUrlDaImagemAtualizarEstado = (arquivo) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(arquivo);
    fileReader.onloadend = () => {
      setImage({
        preview: fileReader.result,
        arquivo
      })
    }
  }

  const aoAlterarImagem = async () => {
    if (!referenciaInput?.current?.files?.length) {
      return
    }
    const arquivo = referenciaInput?.current?.files[0];
    obterUrlDaImagemAtualizarEstado(arquivo)
  }

  const aoSoltarImagem = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const arquivo = e.dataTransfer.files[0]
      obterUrlDaImagemAtualizarEstado(arquivo)
    }
  }

  return (
    <div
      className={`uploadImageContainer ${className}`}
      onClick={abrirSeletorArquivos}
      onDragOver={e => e.preventDefault()}
      onDrop={aoSoltarImagem}
    >
      {imagePreview && (
        <div className='imagePreviewContainer'>
          <img
            src={imagePreview}
            alt='Imagem Preview'
            className={imagePreviewClassName}
          />
        </div>
      )}
      <input
        type='file'
        className='oculto'
        accept='image/*'
        ref={referenciaInput}
        onChange={aoAlterarImagem}
      />
    </div>
  )
}