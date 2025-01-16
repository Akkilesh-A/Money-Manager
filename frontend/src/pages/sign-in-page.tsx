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
interface SignInInputs {
  email: string;
  password: string;
}
import { useSignInMutation } from "@/redux/service/rtk-queries";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";

const inputs = [
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
];

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, { isLoading }] = useSignInMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInputs>();

  async function onSubmit(formData: SignInInputs) {
    try {
      const response = await signIn(formData).unwrap();
      if (response.status === "success") {
        toast.success(response.message);
        localStorage.setItem("money-manager-token", response.data.token);
        dispatch(setUser(response.data.user));
        navigate("/dashboard");
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
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Sign In to continue</CardDescription>
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
                {showPassword ? <Eye /> : <EyeClosed />}
              </div>
            </div>
            <Button disabled={isLoading} type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          New Here?{" "}
          <Link
            className={badgeVariants({ variant: "secondary" })}
            to="/signup"
          >
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
