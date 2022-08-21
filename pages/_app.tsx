import "../styles/globals.css";
import type { AppProps } from "next/app";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";

function MyApp({ Component, pageProps }: AppProps) {
  const [loggedInUser, loading, _error] = useAuthState(auth);
  useEffect(() => {
    const setUserInDb = async () => {
      try {
        await setDoc(
          doc(db, "users", loggedInUser?.email as string),
          {
            email: loggedInUser?.email,
            lastSeen: serverTimestamp(),
            photoURL: loggedInUser?.photoURL,
          },
          {
            merge: true,
          }
        );
      } catch (error) {
        console.log("Error setting user in DB", error);
      }
    };
    if (loggedInUser) {
      setUserInDb();
    }
  }, [loggedInUser]);

  if (loading) return <Loading />;

  if (!loggedInUser) return <Login />;
  return <Component {...pageProps} />;
}

export default MyApp;
