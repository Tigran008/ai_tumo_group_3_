import React, { useState } from 'react';
import { downloadBase64Image } from './lib/utils';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, image }) => {
  const [imageName, setImageName] = useState('');
  const [imageExtension, setImageExtension] = useState('png');
  const [isEmpty, setIsEmpty] = useState(false)

  const handleNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleExtensionChange = (e) => {
    setImageExtension(e.target.value);
  };

  const handleDownload = () => {
    if (imageName.trim() === '') {
      setIsEmpty(true)
      return;
    }

    setIsEmpty(false)
    const fileName = `${imageName}.${imageExtension}`;
    downloadBase64Image(`data:image/${imageExtension};base64,${image.base64}`, fileName);
    onClose();
  };

  return (
    <div className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <label htmlFor="imageName" className={styles.inputLabel}>
          Image File Name:
        </label>
        <input
          type="text"
          id="imageName"
          placeholder="Enter image file name"
          className={styles.nameInput}
          value={imageName}
          onChange={handleNameChange}
        />
        <p className={isEmpty ? `${styles.empty}` : `${styles.text}`}>Please, write an image name!</p>
        <label htmlFor="imageExtension" className={styles.inputLabel}>
          Image File Extension:
        </label>
        <select
          id="imageExtension"
          className={styles.selects}
          value={imageExtension}
          onChange={handleExtensionChange}
        >
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="jpeg">JPEG</option>
          <option value="gif">GIF</option>
          <option value="webp">WEBP</option>
        </select>

        <button className={styles.downloadBtn} onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Modal;
