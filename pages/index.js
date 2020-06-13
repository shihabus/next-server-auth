import Layout from "../components/Layout";
import Link from "next/link";

export default function App() {
  return (
    <Layout title="Home">
      <Link href="/profile">
        <a>Go to profile</a>
      </Link>
    </Layout>
  );
}
