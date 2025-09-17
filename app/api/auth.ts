import { createEffect } from 'effector-next'
import { toast } from 'react-toastify'
import { ISignUpFx, ISignInFx } from '../../types/auth'
import api from '../axiosClient'
import { AxiosError } from 'axios'
import { HTTPStatus } from '@/constans'

export const singUpFx = createEffect(
  async ({ url, username, password, email }: ISignUpFx) => {
    const { data } = await api.post(url, { username, password, email })

    if (data.warningMessage) {
      toast.warning(data.warningMessage)
      return
    }

    toast.success('Регистрация прощла успешно!')

    return data
  }
)

export const singInFx = createEffect(
  async ({ url, username, password }: ISignInFx) => {
    const { data } = await api.post(url, { email: username, password })

    toast.success('Вход выполнен!')

    return data
  }
)

export const checkUserAuthFx = createEffect(async (url: string) => {
  try {
    const { data } = await api.get(url)

    return data
  } catch (error) {
    const axiosError = error as AxiosError

    if (axiosError.response) {
      if (axiosError.response.status === HTTPStatus.FORBIDDEN || 
          axiosError.response.status === HTTPStatus.UNAUTHORIZED) {
        return false
      }
    }

    // Не показываем ошибку в toast, просто возвращаем false
    console.log('Auth check failed:', (error as Error).message)
    return false
  }
})

export const logoutFx = createEffect(async (url: string) => {
  try {
    await api.get(url)
  } catch (error) {
    // Не показываем ошибку в toast для logout
    console.log('Logout error:', (error as Error).message)
  }
})
