/**
 * Config type to reduce boilerplate
 */
export type config = {
  instance: string
  type: "misskey" | "mastodon" | "pleroma"
  accessToken: string
  refreshToken: string | null
  message: string
  visibility: "direct" | "unlisted" | "private" | "public"
  remote: boolean
  booru: string
  tags: string[]
  directory: string
  retries: number
}
