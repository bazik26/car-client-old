export const PHONE_DISPLAY = '+7 (985) 263-41-64'
export const PHONE_LINK = '+79852634164'

interface NumProps {
  withLink?: boolean
  className?: string
}

const Num = ({ withLink = false, className }: NumProps) => {
  if (withLink) {
    return (
      <a href={`tel:${PHONE_LINK}`} className={className}>
        {PHONE_DISPLAY}
      </a>
    )
  }

  return <span className={className}>{PHONE_DISPLAY}</span>
}

export default Num
