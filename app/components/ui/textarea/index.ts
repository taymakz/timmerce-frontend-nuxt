import { cva, type VariantProps } from 'class-variance-authority'

export { default as Textarea } from './Textarea.vue'

export const textareaVariants = cva(
  'flex w-full rounded-lg border border-input bg-background text-sm placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 duration-300',

  {
    variants: {
      variant: {
        'default':
          'h-12 px-3 py-2 resize-none min-h-[100px] max-h-[180px]  focus:border-primary transition-colors rtl:focus:placeholder:-translate-x-3 placeholder:transition-transform placeholder:duration-300 ',
        'floating-label':
          'relative block min-h-[100px] px-4 py-3.5 focus-within:border-primary cursor-text [&_textarea]:border-none [&_textarea]:bg-transparent [&_textarea]:w-full  [&_textarea]:placeholder-transparent [&_textarea]:focus:border-transparent [&_textarea]:focus:outline-none [&_textarea]:outline-none [&_textarea]:resize-none [&_textarea]:max-h-[180px]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export type TextareaVariants = VariantProps<typeof textareaVariants>
