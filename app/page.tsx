import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/dashboard">
        <button type="button">Go to dashboard</button>
      </Link>
    </div>
  );
}
