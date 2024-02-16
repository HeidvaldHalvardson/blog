export interface IPagination {
  total: number
  pageSize: number
  current: number
  onChange: () => void
}