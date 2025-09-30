import { useParams, useNavigate } from "react-router-dom";
import { verifyOTP } from "../services/UserData";
import { useState } from "react";
import Button from "../components/Button";
import toast from "react-hot-toast";
import OTPNumber from "../components/OTP/OTPNumber";

export default function OTPPage() {
    const { username } = useParams() as { username: string };
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const handleVerifyOTP = async () => {
        toast.promise(
            verifyOTP(username, otp).then(() => {
                setTimeout(() => {
                    navigate("/home");
                }, 1500);
            }),
            {
                loading: "تحقق من الرمز...",
                success: "تم التحقق بنجاح!",
                error: (err) => err.status === 401 ? "رمز التحقق غير صحيح" : "فشل التحقق. حاول مرة أخرى."
            }
        );
    };

    return (
        <div className={`min-h-screen w-screen bg-background relative overflow-hidden flex items-center justify-center`}>
            <div className="z-10 lg:w-1/3 md:w-1/2 w-[90%] text-center text-text-primary rounded-xl p-4 md:p-6 lg:p-8 flex flex-col items-center space-y-4 border-2 border-border bg-offset">
                <p className="lg:text-[26px] md:text-[23px] text-[20px] mb-3 md:mb-6">رمز التحقق</p>
                <p className="lg:text-[16px] md:text-[14px] text-[12px] text-text-secondary">يرجى إدخال رمز التحقق المرسل إلى بريدك الإلكتروني</p>
                <OTPNumber length={6} onChange={(value) => setOtp(value)} value={otp} />
                <Button onClick={handleVerifyOTP} buttonText="تحقق" type="primary" />
            </div>
            <div className={`fixed w-full h-full bottom-0 bg-gradient-to-b -translate-y-[15%] lg:-translate-y-[10%] from-background to-primary from-80% animate-breathe`} />
        </div>
    )
}