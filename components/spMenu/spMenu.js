import Link from 'next/link'
import styles from './spMenu.module.css'
import Modal from 'react-modal'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useState } from 'react'

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

export const SpMenu = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  
  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
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
            <li><Link href="/category/list"><a>Category</a></Link></li>
            <li><Link href="/archive/list"><a>Archive</a></Link></li>
            <li><Link href="/contact"><a>Contact</a></Link></li>
          </ul>
        </nav>
      </Modal>
    </div>
  );
}