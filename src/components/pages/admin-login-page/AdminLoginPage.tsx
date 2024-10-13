import styled from "styled-components";
import {LabeledTextInput} from "@comp/ui/text-input/LabeledTextInput";
import {Button} from "@comp/ui/button/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useForm, FormProvider, SubmitHandler} from "react-hook-form";

const MainContainer = styled.div`
    width: 100%;
    min-height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Form = styled.form`
    width: 100%;
    
    & label {
        color: #202020;
    }
    
    & input {
        border: 1px solid #0000001A;
        border-radius: 5px;
        box-shadow: 
            1px 9px 20px 0 #00000008,
            4px 36px 37px 0 #00000005,
            10px 82px 50px 0 #00000003;
    }
    
    & > *:first-child {
        margin-bottom: 10px;
    }
`

const Heading = styled.h1`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 32px;
    line-height: 39px;
    color: #202020;
    margin-bottom: 20px;
    text-align: center;
`

const FormButton = styled.button`
    border-radius: 23px;
    padding: 0;
    border: none;
    margin: 20px auto 0 auto;
    display: block;
    
    & > div {
        width: 226px;
    }
`

const FormContainer = styled.div`
    width: 430px;
`

interface ILoginForm {
    login: string,
    password: string,
}

export const AdminLoginPage = () => {
    const navigate = useNavigate();
    const methods = useForm<ILoginForm>()
    const [error, setError] = useState<string>('')

    const loginAction:SubmitHandler<ILoginForm> = async (data, e) => {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (res.status !== 200) {
            setError('Неверно')
            return
        }

        const json = await res.json()
        localStorage.setItem("access_token", json.access_token)
        navigate('/admin/stat')
    }

    return (
        <>
            <MainContainer>
                <FormContainer>
                    <Heading>Вход</Heading>
                    <FormProvider {...methods}>

                        <Form
                            action="/api/login"
                            method="POST"
                            onSubmit={methods.handleSubmit(loginAction)}
                        >
                            <div>
                                <LabeledTextInput
                                    type="text"
                                    label={
                                        <span>Ваш логин {
                                            error.length > 0 && <span style={{color: '#FF0000'}}>{error}</span>
                                        }</span>
                                    }
                                    placeholder="Ввелите логин"
                                    registerOpts={{
                                        name: 'login',
                                        options: {
                                            required: true,
                                        }
                                    }}
                                    errored={Boolean(methods.formState.errors.login)}
                                />
                            </div>

                            <div>
                                <LabeledTextInput
                                    type="password"
                                    label="Ваш пароль"
                                    placeholder="Ввелите пароль"
                                    registerOpts={{
                                        name: 'password',
                                        options: {
                                            required: true,
                                        }
                                    }}
                                    errored={Boolean(methods.formState.errors.password)}
                                />
                            </div>

                            <FormButton type="submit">
                                <Button text="Продолжить"/>
                            </FormButton>
                        </Form>
                    </FormProvider>
                </FormContainer>

            </MainContainer>
        </>
    );
};