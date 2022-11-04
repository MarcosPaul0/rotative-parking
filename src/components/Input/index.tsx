import { TextInputProps } from 'react-native';
import {
  Controller,
  Control,
  FieldValue,
  RegisterOptions,
  FieldValues,
  FieldPath,
} from 'react-hook-form';
import { ErrorMessage, InputContainer, InputField, Label } from './styles';

export type Rules = Omit<
  RegisterOptions<any, any>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

type ControllerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: string;
  control: Control<FieldValue<any>>;
  rules?: Omit<
    RegisterOptions<TFieldValues, TName>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
};

export interface InputProps {
  label: string;
  errorMessage?: string;
  inputProps?: TextInputProps;
  controllerProps: ControllerProps;
}

export function Input({
  label,
  errorMessage,
  inputProps,
  controllerProps,
}: InputProps) {
  const hasError = !!errorMessage;

  return (
    <InputContainer>
      <Label>{label}</Label>
      <Controller
        {...controllerProps}
        render={({ field: { value, onChange } }) => (
          <InputField {...inputProps} value={value} onChangeText={onChange} />
        )}
      />
      <ErrorMessage hasError={hasError}>{errorMessage}</ErrorMessage>
    </InputContainer>
  );
}
