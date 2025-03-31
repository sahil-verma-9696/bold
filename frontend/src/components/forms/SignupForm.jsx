import UsernameInput from "../../components/ui/inputs/UsernameInput";
import EmailInput from "../../components/ui/inputs/EmailInput";
import PasswordInput from "../../components/ui/inputs/PasswordInput";
import { useState } from "react";
import CloudinaryPreview from "../util/CloudinaryPreview";

export function SignupForm({ submitHandler, isSubmitting }) {
  const DEBUG = false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    submitHandler({ email, password, name, avatar }); // Pass form data to parent
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <CloudinaryPreview setAvatar={setAvatar} />
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
      <UsernameInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
      />

      <button type="submit" className="btn btn-active" disabled={isSubmitting}>
        {isSubmitting ? "Signing up..." : "Signup"}
      </button>
    </form>
  );
}
