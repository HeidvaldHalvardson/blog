export interface IArticle {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  favorited: boolean
  favoritesCount: number
  author: IAuthor
}

interface IAuthor {
  username: string
  image: string
  following: boolean
  bio: string
}

export interface IArticleResponse {
  article: IArticle
}
