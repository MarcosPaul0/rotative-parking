import { ErrorMessage, InputContainer, Label } from '@components/Input/styles';
import {
  Control,
  Controller,
  FieldPath,
  FieldValue,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { MaskedTextInput, MaskedTextInputProps } from 'react-native-mask-text';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components/native';
import { StyleSheet } from 'react-native';
import theme from '@theme/index';

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

interface MaskedInputProps {
  label: string;

  mask: string;
  errorMessage?: string;

  inputProps?: MaskedTextInputProps;
  controllerProps: ControllerProps;
}

const styles = StyleSheet.create({
  input: {
    padding: 5,
    flex: 1,
    minHeight: 42,
    maxHeight: 42,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.COLORS.GRAY_400,
    backgroundColor: theme.COLORS.GRAY_200,
  },
});

export function MaskedInput({
  mask,
  controllerProps,
  label,
  errorMessage,
  inputProps,
}: MaskedInputProps) {
  const { COLORS } = useContext(ThemeContext);

  const hasError = !!errorMessage;

  return (
    <InputContainer>
      <Label>{label}</Label>
      <Controller
        {...controllerProps}
        render={({ field: { value, onChange } }) => (
          <MaskedTextInput
            {...inputProps}
            mask={mask}
            value={value}
            onChangeText={onChange}
            style={styles.input}
            selectionColor={COLORS.BLACK}
          />
        )}
      />
      <ErrorMessage hasError={hasError}>{errorMessage}</ErrorMessage>
    </InputContainer>
  );
}
