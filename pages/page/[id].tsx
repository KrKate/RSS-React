import { useRouter } from 'next/router';
import { NextPage } from 'next/types';

const ID: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <>
      <h1>{query.id}</h1>
    </>
  );
};

export default ID;
