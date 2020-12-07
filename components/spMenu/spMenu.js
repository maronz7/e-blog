import React from 'react';
import Modal from 'react-modal'
import styles from './spMenu.module.css'
import { FaBars, FaTimes } from 'react-icons/fa'
import Link from 'next/link'

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none'
  }
};

const SpMenu = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      {modalIsOpen ? (
        <a className={styles.spCloseButton} onClick={closeModal}><FaTimes /></a>
      ) : <a className={styles.spOpenButton} onClick={openModal}><FaBars /></a>}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
      >
        <nav>
          <ul className={styles.spMenuList}>
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About</a></Link></li>
            <li><Link href="/"><a>Category</a></Link></li>
            <li><Link href="/contact"><a>Contact</a></Link></li>
          </ul>
        </nav>
      </Modal>
    </div>
  );
}

export default SpMenu;