export interface IButtonProps {
  type?: 'green' | 'red' | 'black' | 'blue'
  size?: 'small'
  children: string
  onClick: () => void
}