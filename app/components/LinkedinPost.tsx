import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faMapMarkerAlt, faGrin, faUser, faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import styles from './linkedin.module.css';
import { useState, useEffect, useRef } from 'react';

type Props = {
  post: string;
  imageSrc?: string;
};

const LinkedinPost: React.FC<Props> = ({ post, imageSrc }) => {
  const [copyingImage, setCopyingImage] = useState(false);
  const [copyingText, setCopyingText] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleCopy = async (text: string, setCopying: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopying(true);
      setTimeout(() => setCopying(false), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [post]);
  return (
    <div className={styles.postWrapper}>
      <div className={styles.contentContainer}>
        <div className={styles.postArea}>
          <textarea ref={textareaRef} value={post} readOnly />
        </div>
        <div className={styles.content}>
          <button 
            className={`${styles.postButton} ${copyingText ? styles.success : ''}`}
            onClick={() => handleCopy(post, setCopyingText)}
          >
            {copyingText ? 'Copied!' : 'Text to clipboard'}
          </button>
        </div>
      </div>
      {imageSrc && (
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img src={imageSrc} alt="Generated post visual" />
          </div>
          <div className={styles.imageButton}>
            <button 
              className={`${styles.postButton} ${copyingImage ? styles.success : ''}`}
              onClick={() => handleCopy(imageSrc, setCopyingImage)}
            >
              {copyingImage ? 'Copied!' : 'Image to clipboard'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedinPost;