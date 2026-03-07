import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-sans',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary-hover shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]',
        outline:
          'border border-card-border bg-transparent text-foreground hover:bg-background-secondary hover:border-primary',
        ghost:
          'text-foreground hover:bg-background-secondary hover:text-primary',
        link: 'text-primary underline-offset-4 hover:underline',
        glow:
          'bg-primary text-white shadow-[0_0_20px_var(--glow)] hover:shadow-[0_0_40px_var(--glow)] hover:scale-[1.02] active:scale-[0.98]',
      },
      size: {
        default: 'h-10 px-5 py-2',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
