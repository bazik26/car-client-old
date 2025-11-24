export interface IPartImagesItemProps {
  src: string
  alt: string
  index: number
  isActive: boolean
  onSelect: (index: number) => void
}

export interface IPartAccordionProps {
  title: string
  children: React.ReactNode
}
