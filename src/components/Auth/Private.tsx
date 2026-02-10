import type { ReactElement } from "react";
import { useAuthSession } from "./AuthSessionContext";
import { Navigate } from "react-router";

type PrivateProps = {
  component: ReactElement;
};

export const Private = ({ component }: PrivateProps) => {
  const { session, loading } = useAuthSession();

  if (loading) {
    return <>Authenticating...</>;
  }

  return session ? component : <Navigate to="/auth" />;
};
