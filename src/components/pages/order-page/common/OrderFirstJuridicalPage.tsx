import {LabeledTextInput} from "@comp/ui/text-input/LabeledTextInput";
import {useFormContext} from "react-hook-form";
import {LabeledPhoneInput} from "@comp/ui/text-input/LabeledPhoneInput";

export const OrderFirstJuridicalPage = () => {

    const {formState} = useFormContext()

    return (
        <>
            <LabeledTextInput required
                type={'text'}
                label={'Название организации'}
                placeholder={'Введите название организации'}
                registerOpts={{
                    name: 'organization',
                    options: {required: true}
                }}
                errored={Boolean(formState.errors.organization)}
            />
            <LabeledTextInput
                type={'text'}
                label={'ИНН'}
                placeholder={'Введите ИНН'}
                registerOpts={{
                    name: 'iin',
                    options: {maxLength: 10}
                }}
                errored={Boolean(formState.errors.iin)}
            />
            <LabeledTextInput
                type={'text'}
                label={'Ваш КПП'}
                placeholder={'Введите КПП'}
                registerOpts={{
                    name: 'kpp',
                    options: {maxLength: 9}
                }}
                errored={Boolean(formState.errors.kpp)}
            />
            <LabeledTextInput required
                type={'email'}
                label={'Ваша электронная почта'}
                placeholder={'Введите e-mail'}
                registerOpts={{
                    name: 'email',
                    options: {required: true}
                }}
                errored={Boolean(formState.errors.email)}
            />
            <LabeledPhoneInput required
                type={'text'}
                label={'Ваш номер телефона'}
                placeholder={'Введите номер телефона'}
                registerOpts={{
                    name: 'phone',
                    options: {
                        required: true,
                        pattern: /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/
                    }
                }}
                errored={Boolean(formState.errors.phone)}
            />
        </>
    );
};