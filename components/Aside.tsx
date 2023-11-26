import { useState } from 'react';
import styles from '../styles/Aside.module.css';
const Aside = ({ onClose }: { onClose: () => void }) => {
  const [showModal, setShowModal] = useState(true);
  const handleClickOutside = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(`${styles.modal}`)) {
      setShowModal(false);
      onClose();
    }
  };
  return (
    <div className={styles.aside_wrapper} onClick={handleClickOutside}>
      <div className={styles.wrapper}></div>
      {showModal && (
        <div className={styles.modal}>
          <button className={styles.close} onClick={onClose}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Aside;
