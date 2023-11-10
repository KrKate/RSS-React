import { useNavigate } from 'react-router-dom';
import { CharacterInfo } from './characterInfo';
import { People } from '../models';

export interface AsideProps {
  closeAside: () => void;
  seleсtedCharacter: People;
}

export const Aside: React.FC<AsideProps> = ({
  closeAside,
  selectedCharacter,
}) => {
  const navigate = useNavigate();

  const closeCard = () => {
    navigate('/');
  };

  const handleCloseClick = () => {
    closeCard();
    closeAside();
  };

  return (
    <>
      <div className="aside" onClick={handleCloseClick}></div>
      <div className="modal-card">
        <button className="close-button" onClick={handleCloseClick}>
          Close
        </button>
        <CharacterInfo
          character={selectedCharacter}
          asideShow={true}
          selectedCharacter={selectedCharacter}
          key={''}
        />
      </div>
    </>
  );
};
