import { useRouter } from 'next/router';
import styles from '../styles/Select.module.css';

const Select = () => {
    const router = useRouter();
    const handleLimitChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
        const limit = event.currentTarget.value;
        const query = { ...router.query, limit, page: 1 };
        router.push({ pathname: router.pathname, query });
      };

  return (
    <select className={styles.select} onChange={handleLimitChange}>
      <option value="10">10</option>
      <option value="15">15</option>
      <option value="20">20</option>
    </select>
  );
};

export default Select;
