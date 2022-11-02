import { NextPage } from "next";
import { useSession } from "next-auth/react";

const Protected: NextPage = (): JSX.Element => {
  const { data: session } = useSession();
  return <div>Hello world protected</div>;
};

export default Protected;
