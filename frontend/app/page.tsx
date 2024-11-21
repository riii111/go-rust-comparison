import { redirect, RedirectType } from "next/navigation";

export default function Home() {
  return redirect("/management/auth/login", RedirectType.replace);
}
