import React from 'react';
import { TextComponentKey } from '@/pages/About';

import carolImage from '@/assets/img/carol.jpg';
import pedroImage from '@/assets/img/pedro.jpeg';
import rocioImage from '@/assets/img/rocio.png';
import silvanaImage from '@/assets/img/silvana.png';
import paulaImage from '@/assets/img/paula.jpg';

type ImageGridProps = {
    setName: (name: TextComponentKey) => void;
    selectedImage: string | null;
    setSelectedImage: (name: string | null) => void;
};

const ImageGrid: React.FC<ImageGridProps> = ({ setName, selectedImage, setSelectedImage }) => {
    const images = [
        { src: carolImage, alt: "Carolina", name: "carolina" },
        { src: pedroImage, alt: "Pedro", name: "pedro" },
        { src: rocioImage, alt: "Rocio", name: "rocio" },
        { src: silvanaImage, alt: "Silvana", name: "silvana" },
        { src: paulaImage, alt: "Paula", name: "paula" }
    ];

    const handleImageClick = (name: TextComponentKey) => {
        setSelectedImage(name);
        setName(name);
    };

    return (
        <section className="w-full grid justify-around gap-4 lg:grid-cols-2 lg:gap-1">
            <div className="grid gap-4 grid-cols-3 lg:grid-cols-1">
                {images.slice(0, 3).map((img, index) => (
                    <img
                        key={index}
                        className={`cursor-pointer mx-auto w-[70px] h-[70px] lg:w-[210px] lg:h-[180px] rounded ${selectedImage === img.name ? 'border-2 border-primary_800_color' : ''}`}
                        src={img.src}
                        alt={img.alt}
                        onClick={() => handleImageClick(img.name as TextComponentKey)}
                    />
                ))}
            </div>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-1 lg:flex lg:flex-col lg:justify-center lg:items-center">
                {images.slice(3).map((img, index) => (
                    <img
                        key={index}
                        className={`cursor-pointer mx-auto w-[70px] h-[70px] lg:w-[210px] lg:h-[180px] rounded ${selectedImage === img.name ? 'border-2 border-primary_800_color' : ''}`}
                        src={img.src}
                        alt={img.alt}
                        onClick={() => handleImageClick(img.name as TextComponentKey)}
                    />
                ))}
            </div>
        </section>
    );
};

export default ImageGrid;
