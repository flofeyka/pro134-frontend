export const randomString = () => {
    return Math.floor(Math.random() * Date.now()).toString(36)
}