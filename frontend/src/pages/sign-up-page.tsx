import { useForm } from "react-hook-form";
import { InputField } from "../components";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  badgeVariants,
  Input,
  Label,
  Badge,
} from "@/components/ui";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
interface SignUpInputs {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
}
import { useSignUpMutation } from "@/redux/service/rtk-queries";
import { toast } from "sonner";

const inputs = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter your name",
    type: "text",
    rules: {
      required: {
        value: true,
        message: "Name is required",
      },
      minLength: {
        value: 3,
        message: "Name must be at least 3 characters",
      },
      maxLength: {
        value: 20,
        message: "Name must be at most 20 characters",
      },
    },
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    rules: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      },
    },
    autoComplete: "email",
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    type: "text",
    rules: {
      required: {
        value: true,
        message: "Phone number is required",
      },
      pattern: {
        value: /^\d{10}$/,
        message: "Invalid phone number",
      },
    },
    autoComplete: "phone",
  },
];

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, { isLoading }] = useSignUpMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpInputs>();

  async function onSubmit(formData: SignUpInputs) {
    try {
      const response = await signUp(formData).unwrap();
      if (response.status === "success") {
        toast.success(response.message);
        localStorage.setItem("money-manager-token", response.data.token);
        navigate("/otp");
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "data" in error) {
        const { status, message } = error.data as {
          status: string;
          message: string;
        };
        toast[status === "info" ? "info" : "error"](message);
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>Sign up to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {inputs.map((input, index) => {
              return (
                <InputField
                  key={index}
                  register={register}
                  name={input.name}
                  label={input.label}
                  placeholder={input.placeholder}
                  type={input.type}
                  rules={input.rules}
                  errors={errors}
                  autoComplete={input.autoComplete}
                />
              );
            })}
            <div className="relative">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                name="password"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                autoComplete="password"
              />
              {errors.password && (
                <Badge variant="destructive">{errors.password.message}</Badge>
              )}
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer absolute right-2 top-8"
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </div>
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Confirm Password is required",
                  },
                  minLength: {
                    value: 8,
                    message: "Confirm Password must be at least 8 characters",
                  },
                  validate: {
                    confirmPassword: (value: string) => {
                      const password = watch("password");
                      if (password !== value) {
                        return "Passwords do not match";
                      }
                      return true;
                    },
                  },
                })}
                name="confirmPassword"
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                autoComplete="password"
              />
              {errors.confirmPassword && (
                <Badge variant="destructive">
                  {errors.confirmPassword.message}
                </Badge>
              )}
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          Have an account?{" "}
          <Link
            className={badgeVariants({ variant: "secondary" })}
            to="/signin"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
