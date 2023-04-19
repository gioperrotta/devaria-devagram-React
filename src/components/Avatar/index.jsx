import avatarImgDefault from '../../../public/images/Avatar.svg'
export function Avatar({src}) {

  const getAvatar = () => {
    if (src && src !== 'undefined') {
      return src;
    } 
    return avatarImgDefault.src;
  }
  
  return (
    <img src={getAvatar()} alt='Avatar' className='avatar'/>
  )
}