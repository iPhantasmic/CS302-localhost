import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Protected: NextPage = (): JSX.Element => {
  const session = useSession();
  console.log(session);
  return <div>Hello world protected</div>;
};

export default Protected;
