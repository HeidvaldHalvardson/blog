export interface IButtonProps {
  color?: 'green' | 'red' | 'black' | 'blue'
  size?: 'small'
  children: string
  onClick?: () => void
}
