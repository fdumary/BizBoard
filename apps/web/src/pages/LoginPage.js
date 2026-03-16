import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api";
function LoginPage() {
    const [email, setEmail] = useState("demo@bizboard.app");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const result = await login(email);
            localStorage.setItem("bizboard-token", result.token);
            navigate("/");
        }
        catch (submissionError) {
            setError(submissionError instanceof Error ? submissionError.message : "Login failed.");
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx("main", { className: "container", children: _jsxs("section", { className: "panel", style: { maxWidth: "460px", margin: "4rem auto" }, children: [_jsx("h1", { children: "BizBoard" }), _jsx("p", { className: "muted", children: "Create and share your digital business card." }), _jsxs("form", { onSubmit: onSubmit, className: "grid", children: [_jsx("label", { htmlFor: "email", children: "Email" }), _jsx("input", { id: "email", type: "email", value: email, onChange: (event) => setEmail(event.target.value), required: true }), _jsx("button", { type: "submit", disabled: loading, children: loading ? "Signing in..." : "Sign in" }), error && _jsx("p", { style: { color: "#9e2a2b" }, children: error })] })] }) }));
}
export { LoginPage };
