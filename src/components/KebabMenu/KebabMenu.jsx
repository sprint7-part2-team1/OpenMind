import { useState } from 'react';
import styles from './KebabMenu.module.css';
import Icon from '../Icon/Icon';

const KebabMenu = ({ onEdit, onReject, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles['kebab-menu']}>
      <button className={styles['kebab-menu-button']} onClick={handleMenuOpen}>
        <Icon iconName={'More'} />
      </button>
      {isMenuOpen && (
        <div className={styles['kebab-menu-content']}>
          <button className={styles['kebab-menu-item']} onClick={onEdit}>
            수정
          </button>
          <button className={styles['kebab-menu-item']} onClick={onReject}>
            거절
          </button>
          <button className={styles['kebab-menu-item']} onClick={onDelete}>
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
