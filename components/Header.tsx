import { useState } from 'react';
import styles from '../styles/Header.module.css';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type HeaderProps = {
  queryCallback: (query: string) => void;
};

const Header = ({ queryCallback }: HeaderProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('query')?.toString() || ''
  );

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set('query', searchTerm);
    } else {
      params.delete('query');
    }
    queryCallback(searchTerm);
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className={styles.header}>
      <input
        className={styles.search_input}
        type="text"
        placeholder="Input product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <button className={styles.search_button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Header;
