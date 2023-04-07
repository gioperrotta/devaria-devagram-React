import { useState, useRef } from 'react'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { UploadImage } from '@/components/UploadImage'

export default function Home() {
  const [image, setImage] = useState(null);
  const referenciaInput = useRef(null);

  return (
    <>
      <div style={{ width: 300 }}>
        <h1>Hello World</h1>
        <button onClick={() => referenciaInput?.current?.click()}>Abrir seletor de Arquivos</button>
        <UploadImage
          setImage={setImage}
          imagePreview={image?.preview}
          aoSetarAReferencia={(ref) => referenciaInput.current = ref}
        />
        <Avatar  />
        <Button texto='Login' onClick={() => console.log('CLICOU')} />
      </div>
    </>
  )
}
