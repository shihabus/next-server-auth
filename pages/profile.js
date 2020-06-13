import { useEffect, useState } from "react";
import { getUserProfile, authInitialProps } from "../lib/auth";
import Layout from "../components/Layout";

export default function Profile(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then((user) => setUser(user))
      .catch((err) => {});
  }, []);

  return (
    <Layout title="Profile" {...props}>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Layout>
  );
}

Profile.getInitialProps = authInitialProps(true);
