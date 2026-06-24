import Link from 'next/link'
import { cn } from '@/lib/utils/cn'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

type ButtonLikeProps = ButtonHTMLAttributes<HTMLButtonElement>
type LinkLikeProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & { href: string }

type ButtonProps = {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
} & (ButtonLikeProps | LinkLikeProps)

const variants: Record<Variant, string> = {
  primary:   'bg-terracotta text-white hover:bg-terracotta/90 active:bg-terracotta/80',
  secondary: 'border border-terracotta text-terracotta hover:bg-terracotta hover:text-white',
  ghost:     'text-taupe hover:text-terracotta underline-offset-4 hover:underline',
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body-sm',
  lg: 'px-8 py-4 text-body-md',
}

export function Button({ variant = 'primary', size = 'md', fullWidth, className, children, ...props }: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold',
    'transition-[background,color,border-color,box-shadow] duration-200 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant], sizes[size],
    fullWidth && 'w-full',
    className
  )

  if ('href' in props && typeof props.href === 'string') {
    const { href, ...linkProps } = props as LinkLikeProps

    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    )
  }

  const buttonProps = props as ButtonLikeProps

  return (
    <button
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
