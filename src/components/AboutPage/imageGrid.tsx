import React from 'react';
import { TextComponentKey } from '@/pages/About';

type ImageGridProps = {
    setName: (name: TextComponentKey) => void;
};

const ImageGrid: React.FC<ImageGridProps> = ({ setName }) => {
    const images = [
        { src: "../src/assets/img/carol.jpg", alt: "Carolina", name: "carolina" },
        { src: "../src/assets/img/pedro.jpeg", alt: "Pedro", name: "pedro" },
        { src: "../src/assets/img/rocio.png", alt: "Rocio", name: "rocio" },
        { src: "../src/assets/img/silvana.png", alt: "Silvana", name: "silvana" },
        { src: "../src/assets/img/paula.jpg", alt: "Paula", name: "paula" }
    ];

    return (
        <section className="grid grid-cols-2 gap-1">
            <div className="grid gap-1">
                {images.slice(0, 3).map((img, index) => (
                    <img
                        key={index}
                        className='cursor-pointer'
                        src={img.src}
                        alt={img.alt}
                        onClick={() => setName(img.name as TextComponentKey)}
                        width={210}
                        height={180}
                    />
                ))}
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
                {images.slice(3).map((img, index) => (
                    <img
                        key={index}
                        className='cursor-pointer'
                        src={img.src}
                        alt={img.alt}
                        onClick={() => setName(img.name as TextComponentKey)}
                        width={210}
                        height={180}
                    />
                ))}
            </div>
        </section>
    );
};

export default ImageGrid;
