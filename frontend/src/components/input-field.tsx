import { UseFormRegister } from "react-hook-form";
import { Badge, Input, Label } from "./ui";

interface InputFieldProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  placeholder: string;
  type: string;
  rules: {
    required: {
      value: boolean;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
    min?: {
      value: number;
      message: string;
    };
    max?: {
      value: number;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    validate?: {
      value: (value: string) => boolean | string;
      message: string;
    };
  };
  autoComplete?: string;
  errors: any;
}

const InputField = ({
  register,
  name,
  label,
  placeholder,
  type,
  rules,
  autoComplete,
  errors,
}: InputFieldProps) => {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...register(name, rules)}
      />
      {errors[name] && (
        <Badge variant="destructive">{errors[name]?.message}</Badge>
      )}
    </div>
  );
};

export default InputField;
