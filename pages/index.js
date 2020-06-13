import Layout from "../components/Layout";
import Link from "next/link";
import { authInitialProps } from "../lib/auth";

export default function App(props) {
  return (
    <Layout title="Home" {...props}>
      <Link href="/profile">
        <a>Go to profile</a>
      </Link>
    </Layout>
  );
}

App.getInitialProps = authInitialProps();
