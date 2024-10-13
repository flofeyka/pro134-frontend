import styled from "styled-components";
import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import {Link} from "react-router-dom";
import {useOrders} from "@src/hooks/useOrders";
import {useContext, useEffect, useState} from "react";
import {IOrder} from "@src/types/Order";
import {AdminOrderItem} from "@comp/pages/admin-stat-page/common/AdminOrderItem";
import {WebsocketContext} from "@src/context/websocket-context";
import {IProduct} from "@src/types/Product";
import {usePopularProducts} from "@src/hooks/usePopularProducts";
import {useProductImage} from "@src/hooks/useProductPhotoValue";

const HeadingBlock = styled.div`
    margin: 70px 0 30px 0;
    display: flex;
    align-items: center;
    gap: 36px;
`

const Heading = styled.h1`
    font-family: var(--montserrat-bold);
    font-size: 50px;
    font-weight: 800;
    line-height: 61px;
    text-align: left;
`

const NavigationLink = styled(Link)`
    font-family: var(--montserrat-bold);
    font-size: 16px;
    font-weight: 800;
    line-height: 20px;
    text-align: left;
    text-decoration: none;
    color: #0047FF;
`

const ContentContainer = styled.div`
    display: flex;
    align-items: start;
    gap: 20px;
    
    & > * {
        width: 50%;
    }
`

const OrderContainer = styled.div`
    background: #FFFFFF;
    border: 1px solid #B8B8B8;
    border-radius: 10px;
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding: 20px;
    height: 641px;
    overflow-x: hidden;
    overflow-y: scroll;
    box-shadow: 
         0 10px 16px 0 #0000000D,
         0 14px 29px 0 #0000000A,
         0 37px 40px 0 #00000008,
         0 84px 47px 0 #00000003;

`

const StatContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
`

const StatBlock = styled.div<{blue?: boolean}>`
    padding: 20px;
    border-radius: 10px;
    background-color: ${p => p.blue ? '#0047FF' : '#FFF'};
    border: 1px solid ${p => p.blue ? '#0047FF' : '#B8B8B8'};
    box-shadow:
            0 10px 16px 0 #0000000D,
            0 14px 29px 0 #0000000A,
            0 37px 40px 0 #00000008,
            0 84px 47px 0 #00000003;

    & > * {
        color: ${p => p.blue ? '#FFF' : '#202020'}; 
    }
`

const DefaultHeading = styled.h3`
    font-family: var(--montserrat-bold);
    font-size: 20px;
    font-weight: 800;
    line-height: 24px;
    text-align: center;
`

const OrderHeading = styled(DefaultHeading)`
    text-align: left;
    margin-bottom: 20px;
`

export const AdminStatPage = () => {
    //получение вчерашней даты
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    //заказы
    const [orders, setOrders] = useState<Array<IOrder>>([])

    useEffect(() => {
        useOrders()
            .then(res => res.json())
            .then(data => setOrders(data))
    }, []);

    //вебсокет
    const [connections, setConnections] = useState<number>(0)
    const [yestConnections, setYestConnection] = useState<number>(0)

    const socket = useContext(WebsocketContext)
    socket.on('get-active-connections', (count: number) => {
        setConnections(count)
    })

    socket.on('get-yesterday-connections', (count: number) => {
        setYestConnection(count)
    })

    //популярные станции
    const [popular, setPopular] = useState<Array<IProduct>>([])

    useEffect(() => {
        usePopularProducts()
            .then(res => res.json())
            .then(json => setPopular(json))
    }, []);

    //заказы вчера
    const yesterdayOrders = orders.filter(order => {
        const createdDate = new Date(order.created_at)
        return createdDate.toLocaleDateString() === yesterday.toLocaleDateString()
    })

    ///TODO: проверить количество подключений по вебсокету

    return (
        <>
            <Wrapper>
                <HeadingBlock>
                    <Heading>Статистика</Heading>
                    <NavigationLink to={'/admin/catalog'}>Изменить каталог</NavigationLink>
                </HeadingBlock>
                <ContentContainer>
                    <OrderContainer>
                        <OrderHeading>Кто и что заказывал</OrderHeading>

                        {orders.map(i =>
                            <AdminOrderItem
                                imageSrc={useProductImage(i.products[0].product)}
                                type={i.type}
                                title={i.type === 'PHYSICAL' ? `${i.surname} ${i.name} ${i.patronymic}` : i.organization}
                                email={i.email}
                                phone={i.phone}
                                address={`${i.region}, ${i.city}, ${i.address}`}
                            />
                        )}
                    </OrderContainer>

                    <StatContainer>
                        <StatBlock>
                            <DefaultHeading>Сколько заказали (вчера)</DefaultHeading>
                            <DefaultHeading>{yesterdayOrders.length} человек</DefaultHeading>
                        </StatBlock>
                        <StatBlock blue>
                            <DefaultHeading>Самая популярная станция</DefaultHeading>
                            <DefaultHeading>{popular.length > 0 ? popular[0].model : 'неизвестно'}</DefaultHeading>
                        </StatBlock>
                        <StatBlock>
                            <DefaultHeading>Сколько сейчас на сайте</DefaultHeading>
                            <DefaultHeading>{connections} человек</DefaultHeading>
                        </StatBlock>
                        <StatBlock blue>
                            <DefaultHeading>Сколько зашло за {yesterday.toLocaleDateString('ru-RU')}</DefaultHeading>
                            <DefaultHeading>{yestConnections} человек</DefaultHeading>
                        </StatBlock>
                    </StatContainer>
                </ContentContainer>
            </Wrapper>
        </>
    );
};