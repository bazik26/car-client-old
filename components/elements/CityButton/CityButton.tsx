import { useStore } from 'effector-react'
import LocationSvg from '../LocationSvg/LocationSvg'
import { $mode } from '@/context/mode'
import styles from '@/styles/cityButton/index.module.scss'
import { $userCity, setUserCity } from '@/context/user'
import { getGeolocationFx } from '@/app/api/geolocation'
import { toast } from 'react-toastify'
import spinnerStyles from '@/styles/spinner/index.module.scss'

const CityButton = () => {
  const mode = useStore($mode)
  const { city } = useStore($userCity)
  const spinner = useStore(getGeolocationFx.pending)
  const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

  const getCity = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }
    const success = async (pos: GeolocationPosition) => {
      try {
        const { latitude, longitude } = pos.coords

        const { data } = await getGeolocationFx({ latitude, longitude })

        setUserCity({
          city: data.features[0].properties.city,
          street: data.features[0].properties.address_line1,
        })
      } catch (error) {
        toast.error((error as Error).message)
      }
    }

    const error = (error: GeolocationPositionError) =>
      toast.error(`${error.code} ${error.message}`)

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  return (
    <button className={styles.city} onClick={getCity}>
      <span className={`${styles.city__span} ${darkModeClass}`}>
        <LocationSvg />
      </span>
      <span className={`${styles.city__text} ${darkModeClass}`}>
      {spinner ? (
          <span
            className={spinnerStyles.spinner}
            style={{ top: "-10px", left: 10, width: 20, height: 20 }}
          />
        ) : city && city.length ? (  // Проверка на наличие города
          city
        ) : (
          "Город"
        )}
      </span>
    </button>
  )
}

export default CityButton

// import { useEffect } from 'react'
// import { useStore } from 'effector-react'
// import LocationSvg from '../LocationSvg/LocationSvg'
// import { $mode } from '@/context/mode'
// import styles from '@/styles/cityButton/index.module.scss'
// import { $userCity, setUserCity } from '@/context/user'
// import { getGeolocationFx } from '@/app/api/geolocation'
// import { toast } from 'react-toastify'
// import spinnerStyles from '@/styles/spinner/index.module.scss'

// const CityButton = () => {
//   const mode = useStore($mode)
//   const { city } = useStore($userCity)
//   const spinner = useStore(getGeolocationFx.pending)
//   const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''

//   const getCity = () => {
//     const options = {
//       enableHighAccuracy: true,
//       timeout: 5000,
//       maximumAge: 0,
//     }
//     const success = async (pos: GeolocationPosition) => {
//       try {
//         const { latitude, longitude } = pos.coords

//         const { data } = await getGeolocationFx({ latitude, longitude })

//         setUserCity({
//           city: data.features[0].properties.city,
//           street: data.features[0].properties.address_line1,
//         })

//         // Сохраняем информацию, что город был определён
//         localStorage.setItem('cityDetermined', 'true')
//       } catch (error) {
//         toast.error((error as Error).message)
//       }
//     }

//     const error = (error: GeolocationPositionError) =>
//       toast.error(`${error.code} ${error.message}`)

//     navigator.geolocation.getCurrentPosition(success, error, options)
//   }

//   useEffect(() => {
//     // Проверяем, был ли город уже определён
//     const cityDetermined = localStorage.getItem('cityDetermined')
//     if (!cityDetermined) {
//       getCity()
//     }
//   }, [])

//   return (
//     <button className={styles.city}>
//       <span className={`${styles.city__span} ${darkModeClass}`}>
//         <LocationSvg />
//       </span>
//       <span className={`${styles.city__text} ${darkModeClass}`}>
//         {spinner ? (
//           <span
//             className={spinnerStyles.spinner}
//             style={{ top: '-10px', left: 10, width: 20, height: 20 }}
//           />
//         ) : city.length ? (
//           city
//         ) : (
//           'Город'
//         )}
//       </span>
//     </button>
//   )
// }

// export default CityButton
