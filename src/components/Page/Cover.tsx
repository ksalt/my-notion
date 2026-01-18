import { useRef, type ChangeEventHandler } from 'react'
import styles from './Cover.module.css'

export const Cover = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const onChangeCover = () => {
    fileInputRef.current?.click()
  }

  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      console.log('Uploading file:', file)
      // Implement upload logic here
    }
  }

  return (
    <div className={styles.cover}>
      <img src='src/assets/ztm-notes.png' className={styles.image} alt='Cover'/>
      <button className={styles.button} onClick={onChangeCover}>Change cover</button>
      <input onChange={onCoverImageUpload} style={{display: 'none'}} ref={fileInputRef} type='file' />
    </div>
  )
}