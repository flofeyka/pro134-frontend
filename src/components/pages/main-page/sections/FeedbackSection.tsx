import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import styled from "styled-components";
import {LabeledTextInput} from "@comp/ui/text-input/LabeledTextInput";
import {Button} from "@comp/ui/button/Button";
import FeedbackSrc from "@img/feedback.png"
import {FormProvider, SubmitErrorHandler, SubmitHandler, useForm} from "react-hook-form";
import BlueLines from "@img/BlueLines.svg"
import {LabeledPhoneInput} from "@comp/ui/text-input/LabeledPhoneInput";
import {useState} from "react";

const Heading = styled.h2`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    color: var(--white);
    margin-bottom: 30px;
`

const Container = styled.section`
    padding: 30px 0;
    background: linear-gradient(180deg, #151515 0%, #101010 100%);
    position: relative;
    overflow: hidden;

    svg {
        position: absolute;
        top: 150px;
        left: -200px;
        z-index: auto;
    }
`

const SubmitButton = styled.button`
    padding: 0;
    display: block;
    border-radius: 23px;
    outline: none;
    border: none;
    margin: 20px auto 0 auto;

    @media screen and (min-width: 900px) {
        margin: 20px 0;
    }
`

const Flex = styled.div`
    display: flex;
    align-items: start;
    justify-content: space-between;
    gap: 20px;
`

const Image = styled.div`
    height: 455px;
    width: clamp(500px, 50vw, 974px);
    background-image: url("${FeedbackSrc}");
    background-repeat: no-repeat;
    background-size: 115%;
    background-position: 50% 80%;
    flex-shrink: 0;
    border-radius: 25px;
    display: none;

    @media screen and (min-width: 900px) {
        display: block;
    }
`

const Form = styled.form`
    width: 100%;
    position: relative;
    overflow: hidden;

    @media screen and (min-width: 900px) {
        width: min(100%, 548px);
    }
`

interface IFeedbackForm {
    email: string
    question: string
}

export const FeedbackSection = () => {
    const methods = useForm();
    const [success, setSuccess] = useState<boolean>(false);

    const onValid: SubmitHandler<IFeedbackForm> = async (data, event) => {
        event.preventDefault()
        const response = await fetch('https://pro134.store/api/feedback', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(response.status === 200) {
            setSuccess(true);
        }
    }

    const onInvalid: SubmitErrorHandler<IFeedbackForm> = (data, event) => {
        event.preventDefault()
        console.log('form error')
    }

    const onSubmit = methods.handleSubmit(onValid, onInvalid)

    return (
        <>
            <Container id="feedback">
                <BlueLines width={808} height={761}/>
                <Wrapper>
                    <Flex>
                        <FormProvider {...methods}>
                            <Form
                                action="/api/feedback"
                                method="POST"
                                onSubmit={onSubmit}
                            >
                                <Heading>
                                    <div>
                                        Задать вопрос
                                        </div>
                                    <div
                                        style={{color: "white", fontSize: "12px"}}>{success && "Спасибо! Ваш вопрос был успешно отправлен!"}</div>

                                </Heading>

                                <div style={{marginBottom: '10px'}}>
                                    <LabeledTextInput
                                        label={'Ваша электронная почта'}
                                        type={'text'}
                                        placeholder={'Введите e-mail'}
                                        registerOpts={{
                                            name: 'email',
                                            options: {required: true}
                                        }}
                                        errored={Boolean(methods.formState.errors.email)}
                                    />
                                </div>

                                <div style={{marginBottom: '10px'}}>
                                    <LabeledTextInput
                                        label={'Ваш вопрос'}
                                        type={'text'}
                                        registerOpts={{
                                            name: "question",
                                            options: {required: true}
                                        }}
                                        placeholder={'Введите вопрос'}
                                        errored={Boolean(methods.formState.errors.question)}
                                    />
                                </div>

                                <SubmitButton type="submit">
                                    <Button text={'Связаться с нами'}/>
                                </SubmitButton>
                            </Form>
                        </FormProvider>

                        <Image></Image>
                    </Flex>
                </Wrapper>
            </Container>
        </>
    );
};