interface AvatarGridProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const AvatarGrid = ({ children, className }: AvatarGridProps) => {
  return (
    <section
      className={`grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-1 md:gap-2 lg:gap-4 p-10 h-fit mx-auto ${className}`}
    >
      {children}
    </section>
  )
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
}

const AvatarImage = ({ src, alt, className, ...props }: AvatarImageProps) => {
  return (
    <img
      src={src}
      alt={alt}
      {...props}
      width={180}
      className={`aspect-square object-cover cursor-pointer rounded-md border-2 border-[transparent] ${className}`}
    />
  )
}

AvatarGrid.Image = AvatarImage
