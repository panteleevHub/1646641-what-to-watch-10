export type Review = {
  comment: string,
  date: string,
  id: number,
  rating: number,
  user: {
    id: number,
    name: string,
  },
}

export type Reviews = Review[]

export type NewReview = {
  comment: string,
  rating: number,
  filmId: number,
}
