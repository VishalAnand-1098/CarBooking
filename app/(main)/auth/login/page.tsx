import type { Metadata } from "next";
import AuthClient from "../AuthClient";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your CarHub360 account.",
};

export default function LoginPage() {
  return <AuthClient mode="login" />;
}
