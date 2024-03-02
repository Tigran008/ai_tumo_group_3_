"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Logo from "../public/logo.png"
import { useEffect, useState } from "react";
import * as http from './http-request'
import { downloadBase64Image } from './lib/utils'
import { useRouter } from "next/navigation";
import ResponsiveAppBar from "./navbar/navbar";
//import { Loader } from 'react-loader-spinner';

const GenerationStyles = [
  "3d-model", "analog-film", "anime", "cinematic", "comic-book", "digital-art", "enhance", "fantasy-art", "isometric", "line-art", "low-poly", "modeling-compound", "neon-punk", "origami", "photographic", "pixel-art", "tile-texture"
];

export default function Home() {
  const [images, addImage] = useState([]);
  const [inputText, setInputText] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  
  const handleChangeStyle = (event) => {
    if (event.target.value === 'Select') {
      setSelectedOption('');
    } else {
      setSelectedOption(event.target.value);
    }
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  }

  const handleClick = async () => {
    
    try {
      setIsLoading(true);
      setIsDisabled(true);
      const response = await http.generate(inputText, selectedOption);
      const data = response?.data?.artifacts ?? [];
      addImage([...data]);

    } catch (error) {
      console.error('Error generating data:', error);

    } finally {
      setIsLoading(false);
      setIsDisabled(false)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
    }
  }, []);

  return (
    <main className={styles.main}>
      <ResponsiveAppBar />
      <div className={styles.content}>
        <div className={styles.imageGrid}>
          {images.map((item, index) => {
            return (
              <div key={index}>
                <Image className={styles.img} src={`data:image/png;base64,${item.base64}`} width={200} height={200} alt="img"/>
                <button
                  onClick={() => downloadBase64Image(`data:image/png;base64,${item.base64}`, 'a.png')} 
                >
                  Download
                </button>
              </div>
            )
          })}
        </div>
        <div className={styles.inputRow}>
          <select value={selectedOption} onChange={handleChangeStyle}>
            {GenerationStyles.map((style, index) => (
              <option key={index} value={style}>{style}</option>
            ))}
          </select>
          <input onChange={handleChange} type="text" className={styles.search} placeholder="Describe what you want to see" />
          <div className={styles.btn} onClick={handleClick} disabled={isDisabled}>
            {isLoading ? (
              <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
              </div>
              ) : (
                "Generate"
            )}
          </div>
        </div>  
      </div>
    </main>
  );
}
