"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from 'react-bootstrap/Spinner';
import { useSignUp } from "@clerk/nextjs";
import { TextField, Button, Typography, Card, CardContent, Box } from "@mui/material";
import { useClerk } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { clearUser } from "@/store/userSlice";

export default function SignupPage() {
    const { isLoaded, signUp } = useSignUp();
    const router = useRouter();
    const { signOut } = useClerk();
    const [code, setCode] = useState("");
    const [page, setStep] = useState<"signup" | "verify">("signup");
    const [disable, setDisable] = useState(false);
    const [form, setForm] = useState({
        fname: "",
        lname: "",
        username: "",
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };


    const handleSignOut = async () => {
        // Close the menu
        dispatch(clearUser()); // Clear the Redux state first
        await signOut({ redirectUrl: "/" }); // Programmatically sign out via Clerk
    };



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoaded) return;
        setDisable(true);
        try {
            await signUp.create({
                firstName: form.fname,
                lastName: form.lname,
                username: form.username,
                emailAddress: form.email,
                password: form.password,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setDisable(false);
            setStep("verify");
        } catch (err: unknown) {
            if (err && typeof err === "object" && "errors" in err) {
                const e = err as { errors: { message: string }[] };
                setMessage(e.errors?.[0]?.message || "Signup failed");
                setDisable(false);
            } else {
                setMessage("Signup failed");
                setDisable(false);
            }
        }
    };

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isLoaded) return;
        setDisable(true);
        try {
            const complete = await signUp.attemptEmailAddressVerification({ code });

            if (complete.status === "complete") {
                const res = await fetch("/api/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });

                const data = await res.json();
                handleSignOut();
                router.push(`/`);
                if (!res.ok) {
                    setMessage(data.error || "Database error");
                    return;
                }


            } else {
                setMessage("Verification failed. Try again.");
            }
        } catch (err: unknown) {
            if (err && typeof err === "object" && "errors" in err) {
                const e = err as { errors: { message: string }[] };
                setMessage(e.errors?.[0]?.message || "Verification failed");
            } else {
                setMessage("Verification failed");
            }
        }
    };

    return page === "signup" ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Card style={{ width: "400px", border: "1px solid #000" }}>
                <CardContent style={{ backgroundColor: "white" }}>
                    <Typography variant="h5" className="text-center mb-4 fw-bold"
                        style={{ color: "#black", fontFamily: "cursive" }}>
                        Create Account
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box className="mb-5">
                            <TextField label="First Name" fullWidth name="fname" value={form.fname} onChange={handleChange} sx={textFieldStyles} />
                            <TextField label="Last Name" fullWidth className="mt-3" name="lname" value={form.lname} onChange={handleChange} sx={textFieldStyles} />
                            <TextField label="Email" fullWidth className="mt-3" name="email" value={form.email} onChange={handleChange} sx={textFieldStyles} />
                            <TextField label="Username" fullWidth className="mt-3" name="username" value={form.username} onChange={handleChange} sx={textFieldStyles} />
                            <TextField label="Password" fullWidth className="mt-3" type="password" name="password" value={form.password} onChange={handleChange} sx={textFieldStyles} />
                        </Box>

                        <Button type="submit" fullWidth variant="contained" className="mt-2 baground-black " disabled={disable}
                            style={{ padding: "10px", height: "40px", fontSize: "1.1rem", fontWeight: "bold" }}>
                            {disable ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : "Sign Up"}
                        </Button>
                    </form>

                    {message && <p className="text-center mt-3 text-danger">{message}</p>}

                    <Typography className="text-center mt-3 text-secondary" variant="body2">
                        Already have an account?{" "}
                        <Link href="/" className="fw-bold text-primary text-decoration-none">Login here</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    ) : (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <Card style={{ width: "400px", border: "1px solid #000" }}>
                <CardContent style={{ backgroundColor: "white" }}>
                    <Typography variant="h5" className="text-center mb-4 fw-bold"
                        style={{ color: "#919490", fontFamily: "cursive" }}>
                        Verify Email
                    </Typography>

                    <form onSubmit={handleVerify}>
                        <TextField
                            fullWidth
                            label="Enter OTP"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            sx={textFieldStyles}
                        />

                        <Button type="submit" fullWidth variant="contained" className="mt-3" disabled={disable}
                            style={{ padding: "10px", height: "40px", fontSize: "1.1rem", fontWeight: "bold", }}>
                            {disable ? <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            /> : "Verify Email"}
                        </Button>
                    </form>

                    {message && <p className="text-center mt-3 text-danger">{message}</p>}
                </CardContent>
            </Card>
        </div>
    );
}

const textFieldStyles = {
    "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "black" },
        "&:hover fieldset": { borderColor: "black" },
        "&.Mui-focused fieldset": { borderColor: "black" },
    },
    "& .MuiInputLabel-root": { color: "black" },
    "& .MuiInputLabel-root.Mui-focused": { color: "black" },
    input: { color: "black", fontSize: "18px" },
};
