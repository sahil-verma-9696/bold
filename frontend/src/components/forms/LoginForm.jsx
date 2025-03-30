import EmailInput from "../../components/ui/inputs/EmailInput";
import PasswordInput from "../../components/ui/inputs/PasswordInput";
import { useState } from "react";
export function LoginForm({ submitHandler, isSubmitting }) {
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
        onChange={function (e) {
          setEmail(e.target.value);
        }}
        name="email"
      />
      <PasswordInput
        value={password}
        onChange={function (e) {
          setPassword(e.target.value);
        }}
        name="password"
      />
      <button type="submit" className="btn btn-active" disabled={isSubmitting}>
        {isSubmitting ? "Loging up..." : "Login"}
      </button>
    </form>
  );
}
