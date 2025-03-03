import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import LoginLayout from "../layouts/LoginLayout";
import Input from "../components/Input";
import axiosInstance from "@/services/AxiosInstance";

interface ResetPasswordError {
    password?: string;
    password_confirmation?: string;
}

function ResetPassword() {
    let [user, setUser] = useState<User | null>(null);
    let [errors, setErrors] = useState<ResetPasswordError>();
    let [loading, setLoading] = useState<boolean>(true);
    let [searchParams, setSearchParams] = useSearchParams();
    let token = searchParams.get("token");
    let email = searchParams.get("email");

    if (!token || !email) {
        throw new Error("Token not found");
    }

    useEffect(() => {
        axiosInstance
            .get("reset-password?token=" + token + "&email=" + email)
            .then((response) => {
                setUser(response.data.data)
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading && !user) {
        return <div>Loading...</div>;
    }

    if (!loading && !user) {
        throw new Error("User not found");
    }

    const postResetPassword = async (event: any) => {
        event.preventDefault();
        setLoading(true);

        const password = event.target.password.value;
        const passwordConfirmation = event.target.password_confirmation.value;

        try {
            await axiosInstance.post('/reset-password', {
                token: token,
                email: email,
                password: password,
                password_confirmation: passwordConfirmation
            });
            window.location.href = '/login';
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.data) {
                setErrors(error.response.data.data);
            } else {
                setErrors({ password_confirmation: 'An error occurred. Please try again.', password: '' });
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <LoginLayout>
            <div className="max-w-[500px] w-3/4 flex flex-col">
                <span className="mb-2 text-2xl font-semibold">
                    Reset your password
                </span>
                <span className="mb-8 text-sm">
                    Please enter your new password below.
                </span>

                <form className="loginForm flex flex-col center" onSubmit={postResetPassword}>
                    <Input
                        type="password"
                        id="password"
                        label="Password"
                        className="mb-6"
                        error={errors?.password}
                        required={true}
                    />

                    <Input
                        type="password"
                        id="password_confirmation"
                        label="Confirm Password"
                        className="mb-6"
                        error={errors?.password_confirmation}
                        required={true}
                    />

                    <Button type="submit" loading={loading}>
                        {loading ? "Sending..." : "Reset"}
                    </Button>
                </form>
            </div>
        </LoginLayout>
    );
}

export default ResetPassword;
