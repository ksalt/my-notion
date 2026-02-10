import { useState } from "react";
import { useAuthSession } from "./AuthSessionContext";
import { Navigate } from "react-router";
import styles from "../../utils.module.css";
import { supabase } from "../../supabaseClient";

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const { session } = useAuthSession();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      alert("Check your email for the magic link!");
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.centeredFlex}>
      <div>
        <h1>ZTM Notes App</h1>
        <p>Sign in via magic link with your email below</p>
        {loading ? (
          "Sending magic link"
        ) : (
          <form onSubmit={handleLogin}>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />
            <button>Send Magic Link</button>
          </form>
        )}
      </div>
    </div>
  );
};
