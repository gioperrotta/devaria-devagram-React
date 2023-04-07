/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react"

export function UploadImage({
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

  }, [aoSetarAReferencia])

  const abrirSeletorArquivos = () => {
    referenciaInput?.current?.click()
  }

  const aoAlterarImagem = () => {
    if (!referenciaInput?.current?.files?.length) {
      return
    }
    const arquivo = referenciaInput?.current?.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(arquivo);
    fileReader.onloadend = () => {
      setImage({
        preview: fileReader.result,
        arquivo
      })
    }
  }

  return (
    <div className={`uploadImageContainer ${className}`} onClick={abrirSeletorArquivos}>
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