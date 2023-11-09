import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PaginationProps {
  cardsPerPage: number;
  totalCards: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  cardsPerPage,
  totalCards,
  paginate,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page') || '1', 10);
    paginate(page);
  }, [location.search, paginate]);

  const handlePageClick = (pageNumber: number) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber.toString());
    navigate(`?${searchParams.toString()}`);
  };

  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => handlePageClick(number)}
              href="#"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
