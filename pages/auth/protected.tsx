import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Protected: NextPage = (): JSX.Element => {
  const { data: session } = useSession();
  console.log("session", session);
  console.log(session);
  return <div>Hello world protected</div>;
};

export default Protected;
