import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Fade/slide children in as they enter the viewport. Respects reduced-motion
 * (renders immediately, no transform) and avoids layout shift (opacity/transform only).
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  y = 16,
  className = '',
  ...props
}) {
  const reduced = useReducedMotion()
  const [ref, visible] = useScrollReveal()

  if (reduced) {
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 600ms ease ${delay}ms, transform 600ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
      {...props}
    >
      {children}
    </Tag>
  )
}
