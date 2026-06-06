import type { Metadata } from "next";
import AuthClient from "../AuthClient";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your CarHub360 account to start booking premium cars.",
};

export default function SignupPage() {
  return <AuthClient mode="signup" />;
}
