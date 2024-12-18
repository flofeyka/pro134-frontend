import {LabeledTextInput} from "@comp/ui/text-input/LabeledTextInput";
import {useFormContext} from "react-hook-form";

export const OrderSecondStage = () => {

    const {formState} = useFormContext()

    return (
        <>
            <LabeledTextInput required
                type={'text'}
                label={'Область/Район'}
                placeholder={'Введите облать/район'}
                registerOpts={{
                    name: 'region',
                    options: {required: true}
                }}
                errored={Boolean(formState.errors.region)}
            />
            <LabeledTextInput required
                type={'text'}
                label={'Город'}
                placeholder={'Введите город'}
                registerOpts={{
                    name: 'city',
                    options: {required: true}
                }}
                errored={Boolean(formState.errors.city)}
            />
            <LabeledTextInput required
                type={'text'}
                label={'Адрес'}
                placeholder={'Введите адрес'}
                registerOpts={{
                    name: 'address',
                    options: {required: true}
                }}
                errored={Boolean(formState.errors.address)}
            />

        </>
    );
};