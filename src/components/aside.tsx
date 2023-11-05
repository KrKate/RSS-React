export interface AsideProps {
  closeAside: () => void;
  handleClickOutside: (event: React.MouseEvent) => void;
}

export const Aside: React.FC<AsideProps> = ({
  closeAside,
  handleClickOutside,
}) => {
  return (
    <>
      <div className="aside" onClick={handleClickOutside}></div>
      <div className="modal-card">
        <button className="close-button" onClick={closeAside}>
          Close
        </button>
        <h1>Hey!</h1>
      </div>
    </>
  );
};
