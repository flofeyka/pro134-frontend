export const authFetch = async (url: string, init?: RequestInit) => {
    const pastedInit = init ?? {}

    pastedInit.headers = {
        ...pastedInit.headers,
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }

    const res = await fetch(url, pastedInit)
    const newAccessToken = res.headers.get('x-new-access-token')

    if (newAccessToken) {
        console.group('new token has been set!!!')
        console.log(new Date().toLocaleDateString('ru-RU'))
        console.log(typeof newAccessToken)
        console.log(Boolean(newAccessToken))
        console.log(newAccessToken)
        console.log(res.headers)
        console.groupEnd()
        localStorage.setItem("access_token", newAccessToken)
    }

    return res
}