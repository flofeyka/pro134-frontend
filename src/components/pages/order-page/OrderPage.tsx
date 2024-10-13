import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import styled from "styled-components";
import {Button} from "@comp/ui/button/Button";
import {useState} from "react";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {OrderContext, OrderData} from "./context/OrderContext";
import {OrderStages} from "@comp/pages/order-page/common/OrderStages";
import {authFetch} from "@src/lib/auth_fetch";
import {SuccessOrdered} from "@comp/pages/order-page/common/SuccessOrdered";
import {FailOrder} from "@comp/pages/order-page/common/FailOrder";

const Heading = styled.h1`
    font-family: var(--montserrat-extrabold);
    font-size: 24px;
    font-weight: 800;
    line-height: 29px;
    text-align: center;
    margin-bottom: 30px;
`

const MainContainer = styled.div`
    padding: 50px 0;
`

const Form = styled.form`
    padding: clamp(20px, 3.5vw, 37px) clamp(20px, 4vw, 45px);
    background-color: #F5F5F5;
    border: 1px solid #B8B8B8;
    box-shadow: 
            0 10px 16px 0 #0000000D,
            0 14px 29px 0 #0000000A,
            0 37px 40px 0 #00000008,
            0 84px 47px 0 #00000003;
    border-radius: 25px;
    max-width: 520px;
    margin: 0 auto;
    
    & > * {
        margin-bottom: 10px;
    }
    
    & input {
        border: 1px solid #0000001A;
        box-shadow: 
                1px 9px 20px 0 #00000008,
                4px 36px 37px 0 #00000005,
                10px 82px 50px 0 #00000003;
        border-radius: 5px;
    }
    
    & label {
        color: #202020;
    }
`

const FormButton = styled.button`
    padding: 0;
    border-radius: 23px;
    border: none;
    margin: 0 auto;
`

const FormButtonContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    gap: 10px;
    
    & > * {
        width: 50%;
        
        > * {
            width: 100%;
        }
    }
    
`

export interface IOrderForm {
    name: string,
    surname: string,
    patronymic: string,
    email: string,
    phone: string,
    address: string,
    city: string,

    organization: string,
    iin: string,
    kpp: string,
    region: string,
    apartment: string
}

export const OrderPage = () => {
    const methods = useForm()
    const [ordered, setOrdered] = useState<string>('none')
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [orderBasics, setOrderBasics] = useState<OrderData>({
        stage: 1,
        type: 'juridical'
    })

    const onSubmit:SubmitHandler<IOrderForm> = async (data, event) => {
        event.preventDefault()

        if (orderBasics.stage < 2) {
            setOrderBasics({
                ...orderBasics,
                stage: 2
            })
            return
        }

        const orderData = sessionStorage.getItem("order")

        if (orderData) {
            try {
                const res = await authFetch('/api/order', {
                    method: 'POST',
                    body: JSON.stringify({
                        ...data,
                        order_type: orderBasics.type,
                        products: JSON.parse(orderData)
                    }),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (res.ok) {
                    setTimeout(() => setOrdered('success'), 3000)
                } else {
                    const json = await res.json()
                    setErrorMessage(json.message)
                    setTimeout(() => setOrdered('failure'), 3000)
                }

            } catch (e) {
                setErrorMessage('неизвестная ошибка')
                setOrdered('failure')
            }
        }
    }

    const changeOrderType = () => {
        setOrderBasics({
            ...orderBasics,
            type: orderBasics.type === "juridical" ? "physical" : "juridical"
        })
    }

    return (ordered === 'success') ? (<SuccessOrdered/>) :
           (ordered === 'failure') ? (<FailOrder text={errorMessage}/>) :
        (
        <>
            <MainContainer>
                <Wrapper>
                    <Heading>Оформление заказа</Heading>
                    <FormProvider {...methods}>
                        <Form
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <OrderContext.Provider value={orderBasics}>
                                <OrderStages/>
                            </OrderContext.Provider>
                            <FormButtonContainer>
                                <FormButton type="submit">
                                    <Button text={'Продолжить'}/>
                                </FormButton>
                                {
                                    orderBasics.stage === 1 ?
                                        <FormButton
                                            onClick={changeOrderType}
                                            type="button"
                                        >
                                            <Button
                                                invert
                                                text={orderBasics.type === 'physical' ? 'Я юр. лицо' : 'Я физ. лицо'}
                                            />
                                        </FormButton> :
                                        <FormButton
                                            onClick={() => setOrderBasics({...orderBasics, stage: 1})}
                                            type="button"
                                        >
                                            <Button
                                                invert
                                                text={'Назад'}
                                            />
                                        </FormButton>
                                }
                            </FormButtonContainer>
                        </Form>
                    </FormProvider>

                </Wrapper>
            </MainContainer>
        </>
    )
};