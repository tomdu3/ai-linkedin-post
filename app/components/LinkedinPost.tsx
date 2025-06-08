import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImage, faMapMarkerAlt, faGrin, faUser, faGlobeAsia } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import styles from './linkedin.module.css';
import { useState } from 'react';

type Props = {
  post: string;
  imageSrc?: string;
};

const LinkedinPost: React.FC<Props> = ({ post, imageSrc }) => {
  const [copyingImage, setCopyingImage] = useState(false);
  const [copyingText, setCopyingText] = useState(false);

  const handleCopy = async (text: string, setCopying: (value: boolean) => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopying(true);
      setTimeout(() => setCopying(false), 1000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };
  return (
    <div className={styles.postWrapper}>
      <div className={styles.inputBox}>
        <textarea className={styles.postArea} value={post} readOnly />
        {imageSrc && <Image src={imageSrc} alt={post} width={475} height={475} className={styles.image} />}
        <div className={styles.privacy}>
          <FontAwesomeIcon icon={faGlobeAsia} />
          <span>Everyone can reply</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.content}>
          {imageSrc && (
            <button 
              className={`${styles.postButton} ${copyingImage ? styles.success : ''}`}
              onClick={() => handleCopy(imageSrc, setCopyingImage)}
            >
              {copyingImage ? 'Copied!' : 'Image to clipboard'}
            </button>
          )}
        </div>
        <div className={styles.content}>
          <span className={styles.counter}>100</span>
          <button 
            className={`${styles.postButton} ${copyingText ? styles.success : ''}`}
            onClick={() => handleCopy(post, setCopyingText)}
          >
            {copyingText ? 'Copied!' : 'Text to clipboard'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkedinPost;