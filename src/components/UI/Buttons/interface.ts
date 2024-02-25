export interface IButtonProps {
  type?: 'green' | 'red' | 'black'
  size?: 'small'
  children: string
  onClick?: () => void
}
