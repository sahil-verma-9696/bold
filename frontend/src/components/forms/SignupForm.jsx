import UsernameInput from "../../components/ui/inputs/UsernameInput";
import EmailInput from "../../components/ui/inputs/EmailInput";
import PasswordInput from "../../components/ui/inputs/PasswordInput";
import { useState } from "react";
import CloudinaryPreview from "../util/CloudinaryPreview";

export function SignupForm({ submitHandler, isSubmitting }) {
  const DEBUG = true;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    submitHandler({ email, password }); // Pass form data to parent
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <EmailInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        name="email"
      />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password"
      />
      <button type="submit" className="btn btn-active" disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
}
