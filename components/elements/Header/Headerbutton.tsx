import styles from '@/styles/header/index.module.scss'

const Headerbutton = () => {

  const handleClick = () => {
    const form = document.querySelector('.formbord') as HTMLElement
  
    if (form) {
      if (window.innerWidth > 560) {
        form.style.display = 'flex'
      } else {
        form.style.right = '0px'
      }
    }
  }

  return (
    <div className={styles.header__button}>
	    <button className={styles.header__button__btn} onClick={handleClick}>Оставить запрос</button>
    </div>
  )
}

export default Headerbutton