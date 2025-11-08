"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignupPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        age: "",
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch("/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                setMessage("✅ Signup successful! Redirecting...");
                setTimeout(() => router.push("/"), 1500);
            } else {
                setMessage(`❌ ${data.error || "Signup failed"}`);
            }
        } catch (err) {
            console.error("❌ Signup error:", err);
            setMessage("❌ Something went wrong");
        }
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-gradient">
            {/* ACP Title */}


            {/* Signup Card */}
            <Form
                onSubmit={handleSubmit}
                className="p-4 border rounded-4 shadow-lg bg-white"
                style={{ width: "100%", maxWidth: "380px" }}
            >
                <h3 className="text-center mb-3 text-dark fw-bold">Create Account</h3>

                <Form.Group className="mb-2">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-2">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                    Sign Up
                </Button>

                {message && (
                    <p className="text-center mt-3 text-primary fw-semibold">{message}</p>
                )}

                {/* ✅ Link to Login */}
                <p className="text-center mt-3 text-secondary">
                    Already have an account?{" "}

                    <Link className="text-decoration-none text-primary fw-semibold" href="/">Login here</Link>
                </p>
            </Form>

            <style jsx global>{`
        .bg-gradient {
          background: linear-gradient(135deg, #e3f2fd, #bbdefb);
        }
      `}</style>
        </div>
    );
}
