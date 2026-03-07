import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors font-sans',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary border border-primary/20',
        outline: 'border border-card-border text-foreground-secondary',
        glow: 'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_var(--glow)]',
        solid: 'bg-primary text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
