import { useOtpVerificationMutation } from "@/app/service/rtk-queries";
import {
  badgeVariants,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const OtpPage = () => {
  const [otp, setOtp] = useState("");
  const [verifyOtp, { isLoading }] = useOtpVerificationMutation();
  const navigate = useNavigate();

  async function handleVerify() {
    try {
      const response = await verifyOtp({
        otp,
      }).unwrap();

      if (response.status === "success") {
        toast.success(response.message);
        navigate("/signin");
      }
    } catch (error: unknown) {
      if (error && typeof error === "object" && "data" in error) {
        const { message } = error.data as { message: string };
        toast.error(message);
      }
    }
  }

  return (
    <form className="flex justify-center items-center h-screen">
      <Card>
        <CardHeader>
          <CardTitle>OTP Verification</CardTitle>
        </CardHeader>
        <CardContent>
          <InputOTP onChange={(e) => setOtp(e)} maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={isLoading}
            onClick={handleVerify}
          >
            Verify
          </Button>
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
    </form>
  );
};

export default OtpPage;
