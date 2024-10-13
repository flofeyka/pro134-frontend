import { LabeledTextInput } from "@comp/ui/text-input/LabeledTextInput";
import { useFormContext } from "react-hook-form";
import { LabeledPhoneInput } from "@comp/ui/text-input/LabeledPhoneInput";

export const OrderFirstStage = () => {
  const { formState } = useFormContext();

  return (
    <>
      <LabeledTextInput
        type={"text"}
        label={"Ваше имя"}
        placeholder={"Введите имя"}
        registerOpts={{
          name: "name",
          options: { required: true },
        }}
        errored={Boolean(formState.errors.name)}
      />
      <LabeledTextInput
        type={"text"}
        label={"Ваше фамилия"}
        placeholder={"Введите фамилию"}
        registerOpts={{
          name: "surname",
          options: { required: true },
        }}
        errored={Boolean(formState.errors.surname)}
      />
      <LabeledTextInput
        type={"text"}
        label={"Ваше отчество"}
        placeholder={"Введите отчество"}
        registerOpts={{
          name: "patronymic",
        }}
        errored={Boolean(formState.errors.patronymic)}
      />
      <LabeledTextInput
        type={"email"}
        label={"Ваша электронная почта"}
        placeholder={"Введите e-mail"}
        registerOpts={{
          name: "email",
          options: { required: true },
        }}
        errored={Boolean(formState.errors.email)}
      />
      <LabeledPhoneInput
        type={"text"}
        label={"Ваш номер телефона"}
        placeholder={"Введите номер телефона"}
        registerOpts={{
          name: "phone",
          options: {
            required: true,
            pattern: /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
          },
        }}
        errored={Boolean(formState.errors.phone)}
      />
    </>
  );
};
