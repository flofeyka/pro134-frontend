export const useNavLinks: () => Array<{
    title: string,
    to: string
}> = () => [
    {
        title: 'Главная',
        to: '/'
    },
    {
        title: 'О нас',
        to: '/#about'
    },
    {
        title: 'Наши преимущества',
        to: '/#advantage'
    },
    {
        title: 'Отзывы',
        to: '/#reviews'
    },
    {
        title: 'Каталог',
        to: '/catalog'
    },
    {
        title: 'Корзина',
        to: '/cart'
    }
]