import styled from "styled-components";
import {Wrapper} from "@comp/hoc/wrapper/Wrapper";
import {ChangeEvent, DragEventHandler, FormEvent, useEffect, useState} from "react";
import {AddImageItem} from "@comp/pages/admin-add-product-page/common/AddImageItem";
import {AddImageInput} from "@comp/pages/admin-add-product-page/common/AddImageInput";
import {TextInput} from "@comp/ui/text-input/TextInput";
import {Button} from "@comp/ui/button/Button";
import InputMask from "react-input-mask"
import {DropModal} from "@comp/pages/admin-add-product-page/common/DropModal";
import {Swiper, SwiperSlide} from "swiper/react";
import 'swiper/css'
import {useNavigate, useParams} from "react-router-dom";
import {useProduct} from "@src/hooks/useProduct";
import {IProduct} from "@src/types/Product";
import {fillMaskString} from "@src/lib/fill_mask_string";
import {authFetch} from "@src/lib/auth_fetch";
import {FormProvider, SubmitHandler, useForm} from "react-hook-form";
import {useProductWithStopped} from "@src/hooks/useProductWithStopped";

const MainContainer = styled.div`
    padding: 70px 0;
`

const Heading = styled.h2`
    font-family: var(--montserrat-extrabold);
    font-weight: 800;
    font-size: 50px;
    line-height: 61px;
    color: #202020;
    padding-bottom: 40px;
`

const ImageContainer = styled.div`
    display: flex;
    padding: 20px;
    gap: 20px;
    border-radius: 10px;
    border: 1px solid #B8B8B8;
    box-shadow: 
            0 10px 16px 0 #0000000D,
            0 14px 29px 0 #0000000A,
            0 37px 40px 0 #00000008,
            0 84px 47px 0 #00000003;
    
    .swiper-slide {
        width: 210px!important;
        margin-right: 20px;
    }
    
    .swiper {
        margin: 0;
    }
`

const ParamsBlock = styled.div`
    margin-top: 40px;
`

const Param = styled.div<{$errored: boolean}>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    border-bottom: 1px solid ${p => p.$errored ? '#FF0000' : 'transparent'};
    
    & > :first-child {
        font-family: var(--montserrat-regular);
        font-weight: 600;
        font-size: 14px;
        line-height: 16px;
        color: #202020;
        flex-shrink: 0;
        text-wrap: wrap;
        width: 30%;
    }
    
    & > *:last-child {
        box-shadow: none;
        border-radius: 0;
        line-height: normal;
        height: auto;
        width: 70%;
        border: none;
        flex-shrink: 0;
        outline: none;
        background-color: transparent;
        text-align: end;
        font-size: 14px;
        font-family: var(--montserrat-regular);
        padding: 0;
        
        & input {
            outline: none;
            border: none;
            background-color: transparent;
            padding: 0;
            text-align: end;
            font-size: 14px;
            text-wrap: wrap;
        }
    }
`

const Params = styled.div`
    width: 250px;
`

const Form = styled.form`
    display: flex;
    gap: 20px;
    align-items: start;
`

const FormButton = styled.button`
    border: none;
    width: auto;
    height: min-content;
    padding: 0;
    border-radius: 23px;
`

const BackButton = styled.button`
    border: none;
    width: auto;
    height: min-content;
    padding: 0;
    border-radius: 23px;
    
    & > * {
        background-color: #FF0000;
        border-color: #FF0000;
        width: 100%;
    }
`

const ButtonsBlock = styled.div`
    align-self: end;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

interface IEditProductForm {
    model: string,
    capacity: string,
    rated_power: string,
    peak_power: string,
    battery_type: string,
    adapter: string,
    car_charge_input: string,
    sun_charge: string,
    work_temp: string,
    ac_output: string,
    usb_output: string,
    output: string,
    dc_output: string,
    type_c_output: string,
    output_signal: string,
    gross_weight: string,
    size: string,
    price: string
}

export const AdminEditProductPage = () => {
    const navigate = useNavigate()
    const methods = useForm()

    const {id} = useParams()
    if (isNaN(+id)) {
        navigate('404')
    }

    const [images, setImages] = useState<Array<string>>([])
    const [files, setFiles] = useState<Array<File>>([])

    useEffect(() => {
        useProductWithStopped(+id)
            .then(res => res.json())
            .then((p: IProduct) => {
                //заполнение полей формы
                methods.setValue('model', p.model)
                methods.setValue('capacity', p.capacity)
                methods.setValue('rated_power', fillMaskString(p.rated_power.toString(), 5, '0')+ ' Вт')
                methods.setValue('peak_power', fillMaskString(p.peak_power.toString(), 5, '0')+ ' Вт')
                methods.setValue('battery_type', p.battery_type)
                methods.setValue('adapter', p.adapter)
                methods.setValue('car_charge_input', p.car_charge_input)
                methods.setValue('sun_charge', p.sun_charge)
                methods.setValue('work_temp', p.work_temp)
                methods.setValue('ac_output', p.ac_output)
                methods.setValue('usb_output', p.usb_output)
                methods.setValue('output', p.output)
                methods.setValue('dc_output', p.dc_output)
                methods.setValue('type_c_output', p.type_c_output)
                methods.setValue('output_signal', p.output_signal)
                methods.setValue('gross_weight', p.gross_weight)
                methods.setValue('size', `${p.height}x${p.length}x${p.width}`)
                methods.setValue('price', p.price.toString())

                //фото
                const neededLoadedFiles: Array<File> = []

                //функция для загрузки изображений
                const loadFiles = async (index: number) => {
                    if (index < p.photos.length) {
                        const res = await fetch('/api/public/' + p.photos[index].source)
                        const blob = await res.blob()
                        const extension = blob.type.split('/')[1]
                        const filename = 'tmp.' + extension
                        const file = new File([blob], filename, {
                            type: blob.type
                        })
                        neededLoadedFiles.push(file)
                    }

                    if (index === p.photos.length) {
                        setFiles(neededLoadedFiles)
                        return
                    }

                    await loadFiles(index + 1)
                }

                loadFiles(0)
            })
    }, []);


    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files[0]
        setFiles(files.concat(file))
    }

    const submitHandler:SubmitHandler<IEditProductForm>  = async (data, event) => {
        event.preventDefault()
        const formData = new FormData()

        Object.entries(data).forEach(([key, value]) => {
            formData.set(key, value)
        })

        files.forEach((file: File) => {
            formData.append("photos", file)
        })

        const res = await authFetch(`/api/product/${id}`, {
            method: "PUT",
            body: formData
        })

        if (res.ok) {
            navigate('/admin/catalog')
        }
    }

    const [dropModal, setDropModal] = useState(false)

    const onDrop:DragEventHandler = (e) => {
        e.preventDefault()
        const regex = /image\/[a-z]*/;
        const dropFiles = Array.from(e.dataTransfer.files).filter((file: File) => {
            return regex.test(file.type)
        })
        setFiles(files.concat(dropFiles))
        setDropModal(false)
    }

    useEffect(() => {
        const reader = new FileReader()
        const dataUrls: Array<string> = []

        const readFile = (index: number) => {
            if (index < files.length) {
                reader.readAsDataURL(files[index])
                reader.onload = ev => {
                    dataUrls.push(ev.target.result.toString())
                    readFile(index + 1)
                }
            } else if (index === files.length) {
                setImages(dataUrls)
            }
            return
        }
        readFile(0)
    }, [files]);

    return (
        <>
            <MainContainer>
                <Wrapper>
                    <Heading>Галерея</Heading>
                    <ImageContainer>
                        <Swiper
                            slidesPerView={5}
                        >
                            {images.map((item, index) =>
                                <SwiperSlide>
                                    <div
                                        onDoubleClick={() => setFiles(
                                            files.filter((f, i) => i !== index)
                                        )}
                                    >
                                        <AddImageItem key={index} src={item} />
                                    </div>
                                </SwiperSlide>
                            )}
                            <SwiperSlide>
                                <AddImageInput onChange={onChange} />
                            </SwiperSlide>
                        </Swiper>
                    </ImageContainer>
                    <ParamsBlock>
                        <Heading>Характеристики</Heading>
                        <FormProvider {...methods}>
                            <Form onSubmit={methods.handleSubmit(submitHandler)}>
                                <Params>
                                    <Param $errored={Boolean(methods.formState.errors.model)}>
                                        <div>Модель</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'model',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.capacity)}>
                                        <div>Емкость батареи</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'capacity',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.rated_power)}>
                                        <div>Номинальная мощность</div>
                                        <InputMask
                                            mask="99999 Вт"
                                            type="text"
                                            placeholder="Нет инфо"
                                            {...methods.register('rated_power', {required: true})}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.peak_power)}>
                                        <div>Пиковая мощность</div>
                                        <InputMask
                                            mask="99999 Вт"
                                            type="text"
                                            placeholder="Нет инфо"
                                            {...methods.register('peak_power', {required: true})}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.battery_type)}>
                                        <div>Тип батареи</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'battery_type',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.adapter)}>
                                        <div>Адаптер</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'adapter',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.car_charge_input)}>
                                        <div>Вход для зарядки авто</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'car_charge_input',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.sun_charge)}>
                                        <div>Солнечная зарядка</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'sun_charge',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.work_temp)}>
                                        <div>Рабочая температура</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'work_temp',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                </Params>
                                <Params>

                                    <Param $errored={Boolean(methods.formState.errors.ac_output)}>
                                        <div>Выход переменного тока</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'ac_output',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.usb_output)}>
                                        <div>USB-выход</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'usb_output',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.output)}>
                                        <div>Выход</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'output',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.dc_output)}>
                                        <div>Выход постоянного тока</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'dc_output',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.type_c_output)}>
                                        <div>Выход type-c</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'type_c_output',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.output_signal)}>
                                        <div>Выходной сигнал</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'output_signal',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.gross_weight)}>
                                        <div>Вес брутто</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'gross_weight',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                    <Param $errored={Boolean(methods.formState.errors.size)}>
                                        <div>Размер</div>
                                        <InputMask
                                            type="text"
                                            mask="999x999x999"
                                            placeholder="Нет инфо"
                                            {...methods.register('size', {required: true})}
                                        />
                                    </Param>
                                </Params>
                                <Params>
                                    <Param $errored={Boolean(methods.formState.errors.price)}>
                                        <div>Цена</div>
                                        <TextInput
                                            type="text"
                                            placeholder="Нет инфо"
                                            registerOpts={{
                                                name: 'price',
                                                options: {
                                                    required: true
                                                }
                                            }}
                                        />
                                    </Param>
                                </Params>
                                <ButtonsBlock>
                                    <FormButton type="submit">
                                        <Button text="Сохранить"/>
                                    </FormButton>
                                    <BackButton
                                        type="button"
                                        onClick={() => navigate(-1)}
                                    >
                                        <Button text="Назад"/>
                                    </BackButton>
                                </ButtonsBlock>
                            </Form>
                        </FormProvider>
                    </ParamsBlock>
                </Wrapper>
            </MainContainer>
            <DropModal open={dropModal} setOpen={setDropModal} onDrop={onDrop} />
        </>
    );
};