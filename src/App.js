import React, { useState, useEffect } from 'react'
import './App.css';
import useIntersectionObserver from './Hook';
import Image from './Image';
import LazyImage from './images/lazy_image.jpg'

function App() {
  const [images, setImages] = useState([])

  const [observer, setElements, entries] = useIntersectionObserver({
    threshold: 0.5,
    root: null
  })


  useEffect(() => {
    let imgs = [];
    for (let i = 1; i <= 10; i++) {
      imgs.push({
        id: i,
        src: require(`./images/image${i}.jpeg`).default,
      })
    }

    setImages(imgs);
  }, [])


  useEffect(() => {
    if (images.length) {
      let img = Array.from(document.getElementsByClassName('lazy'));
      setElements(img)
    }
  }, [images, setElements])


  useEffect(() => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        observer.unobserve(lazyImage);
      }
    })
  }, [entries, observer])


  return (
    <div className="container">
      {images.map((image, index) => (
        <Image
          key={image.id}
          src={image.src}
          fallbackSrc={LazyImage}
          isLazy
          alt={`lazy${index}`}
          style={{
            display: 'block',
            height: '500px',
            width: '700px',
            margin: 'auto',
            marginBottom: '50px'
          }}
        />
      ))}
    </div>
  );
}

export default App;
