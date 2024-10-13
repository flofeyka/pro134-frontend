import {authFetch} from "@src/lib/auth_fetch";

/** Авторизован ли пользователь
 * @return Promise<boolean>
 */
export const useCheckAuth = async () => {
    const res = await authFetch('/api/check-auth')
    return res.ok
}