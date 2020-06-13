import axios from "axios";
import Router from "next/router";

axios.defaults.withCredentials = true; // to add cookie to request

const WINDOW_SCRIPT_VARIABLE = "__USER__";

export const loginUser = async (email, password) => {
  const { data } = await axios.post("/api/login", {
    email,
    password,
  });
  // ensure running on client
  // setting the user data in window
  if (typeof window !== "undefined") {
    window[WINDOW_SCRIPT_VARIABLE] = data || {};
  }
};

export const getUserProfile = async () => {
  const { data } = await axios.get("/api/profile");
  return data;
};

// supposed to run in server
export const getServerSideToken = (req) => {
  const { signedCookies = {} } = req;
  if (!signedCookies) {
    return {};
  } else if (!signedCookies.token) {
    return {};
  }
  return { user: signedCookies.token };
};

export const getClientSideToken = () => {
  if (typeof window !== "undefined") {
    const user = window[WINDOW_SCRIPT_VARIABLE] || {};
    return { user };
  }
  return { user: {} };
};

export const getUserScript = (user) => {
  return `${WINDOW_SCRIPT_VARIABLE}=${JSON.stringify(user)}`;
};

export const authInitialProps = (isProtectedRoute) => ({ req, res }) => {
  const auth = req ? getServerSideToken(req) : getClientSideToken();
  const currentPath = req ? req.url : window && window.location.pathname;
  const user = auth.user;
  const isAnonymous = !user || user.type !== "authenticated";

  if (isProtectedRoute && isAnonymous && currentPath !== "/login") {
    return redirectUser(res, "/login");
  }
  return { auth };
};

const redirectUser = (res, path) => {
  if (res) {
    res.redirect(302, path); // temp redirect
    res.finished = true;
    return {};
  }
  Router.replace(path);
  return {};
};

export const logOutUser = async () => {
  if (typeof window !== "undefined") {
    window[WINDOW_SCRIPT_VARIABLE] = {};
  }
  axios.post("/api/logout");
  Router.push("/login");
};
