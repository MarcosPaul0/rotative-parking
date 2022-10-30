import { TextInputProps } from 'react-native';
import { Controller, Control, FieldValue } from 'react-hook-form';
import { InputContainer, InputField, Label } from './styles';

interface ControllerProps {
  name: string;
  control: Control<FieldValue<any>>;
}

export interface InputProps {
  label: string;
  inputProps?: TextInputProps;
  controllerProps: ControllerProps;
}

export function Input({ label, inputProps, controllerProps }: InputProps) {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <Controller
        {...controllerProps}
        render={({ field: { value, onChange } }) => (
          <InputField {...inputProps} value={value} onChangeText={onChange} />
        )}
      />
    </InputContainer>
  );
}
