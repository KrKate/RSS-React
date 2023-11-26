import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import styles from '../styles/Pagination.module.css';

export const Pagination = ({ totalPages }: { totalPages: number }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const updatePageNumber = (newPageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      updatePageNumber(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      updatePageNumber(currentPage + 1);
    }
  };

  return (
    <div className={styles.pagination_wrapper}>
      <button className={styles.prev} onClick={goToPrevPage}>
        Prev
      </button>
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <Link
              className={styles.item_wrapper}
              key={pageNumber}
              href={createPageURL(pageNumber)}
            >
              <span className={styles.pagination_item}>{pageNumber}</span>
            </Link>
          )
        )}
      </div>
      <button className={styles.next} onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};
