import React from 'react'
import { TextComponentKey } from '@/pages/About'

import carolImage from '@/assets/img/carol.jpg'
import pedroImage from '@/assets/img/pedro.jpeg'
import rocioImage from '@/assets/img/rocio.png'
import silvanaImage from '@/assets/img/silvana.png'

type ImageGridProps = {
  setName: (name: TextComponentKey) => void
  selectedImage: string | null
  setSelectedImage: (name: string | null) => void
}

const ImageGrid: React.FC<ImageGridProps> = ({
  setName,
  selectedImage,
  setSelectedImage
}) => {
  const images = [
    { src: carolImage, alt: 'Carolina', name: 'carolina' },
    { src: pedroImage, alt: 'Pedro', name: 'pedro' },
    { src: rocioImage, alt: 'Rocio', name: 'rocio' },
    { src: silvanaImage, alt: 'Silvana', name: 'silvana' }
  ]

  const handleImageClick = (name: TextComponentKey) => {
    setSelectedImage(name)
    setName(name)
  }

  return (
    <section className="h-fit grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-1 md:gap-2 lg:gap-4 pt-20 w-fit mx-auto px-10">
      {images.map(img => (
        <img
          width={180}
          src={img.src}
          alt={img.alt}
          key={img.name}
          onClick={() => handleImageClick(img.name as TextComponentKey)}
          className={`aspect-square object-cover cursor-pointer mx-auto rounded-md border-2 ${
            selectedImage === img.name
              ? 'border-primary_800_color'
              : 'border-[transparent]'
          }`}
        />
      ))}
    </section>
  )
}

export default ImageGrid
