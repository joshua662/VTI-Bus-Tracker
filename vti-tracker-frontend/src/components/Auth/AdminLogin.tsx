import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import AuthField from "../AuthField/AuthField";
import SubmitButton from "../Button/SubmitButton";
import { useAuth } from "../../hooks/useAuth";
import { adminAuthApi } from "../../services/adminApi";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import type { AdmissionRegistrationForm } from "../RegistrationModal/authTypes";
import ToastMessage from "../ToastMessage/ToastMessage";
import RegistrationSuccessModal from "../RegistrationSuccessModal/RegistrationSuccessModal";
import AuthPageLayout from "../AuthPageLayout/AuthPageLayout";
import { validateLoginForm } from "../../utils/validateForm";
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";
import { TownLogo } from "./TownLogo";

const emptyForm = (): AdmissionRegistrationForm => ({
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    birth_date: "",
    email: "",
});

const AdminLogin = () => {
    const { user, loading, login, register } = useAuth();
    const [justLoggedIn, setJustLoggedIn] = useState(false);

    const [registrationOpen, setRegistrationOpen] = useState(false);
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
    const [registerLoading, setRegisterLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);
    const [genders, setGenders] = useState<{ gender_id: number; gender: string }[]>([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [form, setForm] = useState(emptyForm());
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    const [captchaA, setCaptchaA] = useState(0);
    const [captchaB, setCaptchaB] = useState(0);
    const [captchaAnswer, setCaptchaAnswer] = useState("");
    const [captchaError, setCaptchaError] = useState("");

    const [toast, setToast] = useState({ visible: false, message: "", failed: false });

    const showToast = (message: string, failed: boolean) =>
        setToast({ visible: true, message, failed });

    const closeToast = () => setToast((t) => ({ ...t, visible: false }));

    const refreshCaptcha = useCallback(() => {
        setCaptchaA(Math.floor(Math.random() * 90) + 10);
        setCaptchaB(Math.floor(Math.random() * 9) + 1);
        setCaptchaAnswer("");
        setCaptchaError("");
    }, []);

    useEffect(() => {
        if (!registrationOpen) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        refreshCaptcha();
        adminAuthApi
            .loadGenders()
            .then((res) => setGenders(res.data?.genders ?? []))
            .catch(() => showToast("Could not load gender options.", true));
    }, [registrationOpen, refreshCaptcha]);

    const handleLoginSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const errors = validateLoginForm(username, password);
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }
        setLoginLoading(true);
        setFieldErrors({});

        try {
            setJustLoggedIn(true);
            await login(username.trim(), password);
            showToast("Login successful. Welcome back!", false);
            setTimeout(() => {
                window.location.href = "/";
            }, 800);
        } catch (error) {
            const err = error as { response?: { data?: { message?: string } }; message?: string };
            showToast(err.response?.data?.message ?? err.message ?? "Invalid credentials.", true);
            setJustLoggedIn(false);
        } finally {
            setLoginLoading(false);
        }
    };

    const handleRegister = async () => {
        setRegisterLoading(true);
        setFieldErrors({});

        try {
            const res = await register({
                first_name: form.first_name.trim(),
                middle_name: form.middle_name?.trim() || undefined,
                last_name: form.last_name.trim(),
                gender: form.gender,
                birth_date: form.birth_date,
                email: form.email.trim(),
            });
            setForm(emptyForm());
            showToast((res as { data?: { message?: string } })?.data?.message ?? "Registration complete. Credentials were sent to the registered email.", false);
            refreshCaptcha();
        } catch (error) {
            const err = error as {
                response?: { data?: { message?: string; errors?: Record<string, string[]> } };
            };
            if (err.response?.data?.errors) {
                setFieldErrors(err.response.data.errors);
            }
            showToast(err.response?.data?.message ?? "Registration failed.", true);
        } finally {
            setRegisterLoading(false);
        }
    };

    const handleRegistrationClose = () => {
        setRegistrationOpen(false);
    };

    if (!loading && user && !justLoggedIn) {
        return <Navigate to="/" replace />;
    }

    return (
        <AuthPageLayout>
            <ToastMessage
                isVisible={toast.visible && toast.failed}
                message={toast.message}
                isFailed={toast.failed}
                onClose={closeToast}
                overlay
                size="large"
            />
            <RegistrationSuccessModal
                isVisible={toast.visible && !toast.failed}
                onClose={closeToast}
            />

            <ForgotPasswordModal 
                isOpen={forgotPasswordOpen}
                onClose={() => setForgotPasswordOpen(false)}
            />

            <div className="mb-7 flex flex-col items-center text-center">
                <TownLogo className="mb-7" />
                <h2 className="text-[26px] font-bold tracking-tight text-white">
                    Welcome back!
                </h2>
                <p className="mt-2 max-w-[18.5rem] text-[13px] leading-relaxed text-white/70">
                    Sign in to reach your gate dashboard and stay on top of access activity.
                </p>
            </div>

            <form onSubmit={handleLoginSubmit}>
                <AuthField
                    label="Username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    errors={fieldErrors.username}
                    required
                    autoFocus
                />
                <AuthField
                    label="Password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    errors={fieldErrors.password}
                    required
                    passwordToggle
                />

                <div className="mt-1 mb-5 flex items-center justify-between text-[13px]">
                    <label className="flex cursor-pointer items-center gap-2 text-white/80">
                        <span className="relative inline-flex h-4 w-4 items-center justify-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                            />
                            <span className="h-4 w-4 rounded-[4px] border border-white/25 bg-white/5 peer-checked:border-[#7c5cff] peer-checked:bg-[#7c5cff]" />
                            <svg
                                viewBox="0 0 16 16"
                                className="pointer-events-none absolute inset-0 m-auto h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                            >
                                <path d="M3.5 8.2 6.4 11l6.1-6.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                        Remember me
                    </label>
                    <button
                        type="button"
                        onClick={() => setForgotPasswordOpen(true)}
                        className="cursor-pointer text-white/75 transition hover:text-white"
                    >
                        Forgot password?
                    </button>
                </div>

                <SubmitButton
                    className="w-full rounded-full border-0 py-3.5 text-sm font-semibold shadow-lg shadow-black/25"
                    newClassName="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold tracking-wide text-slate-900 shadow-xl shadow-black/30 transition hover:bg-slate-100 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                    label="Log In"
                    loading={loginLoading}
                    loadingLabel="Signing in..."
                />
            </form>

            <p className="mt-7 text-center text-[13px] text-white/70">
                Don&apos;t have an account?{" "}
                <button
                    type="button"
                    className="cursor-pointer font-semibold text-white underline decoration-white/80 underline-offset-[3px] transition hover:text-white/80"
                    onClick={() => setRegistrationOpen(true)}
                >
                    Registration
                </button>
            </p>

            <RegistrationModal
                isOpen={registrationOpen}
                onClose={handleRegistrationClose}
                form={form}
                setForm={setForm}
                genders={genders}
                fieldErrors={fieldErrors}
                loading={registerLoading}
                onRegister={handleRegister}
                registrationSuccess={toast.visible && !toast.failed}
            />
        </AuthPageLayout>
    );
};

export default AdminLogin;
