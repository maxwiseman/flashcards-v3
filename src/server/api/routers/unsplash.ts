import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

const url =
  "https://api.unsplash.com/photos/random?topics=6sMVjTLSkeQ,M8jVbLbTRws,bo8jQKTaE0Y,CDwuwXJAbEw,Fzo3zuOHN6w,xHxYTMHLgOc,iUIsnVtjB0Y,hmenvQhUmxM,Jpg6Kidl-Hk&content_filter=high";

export const unsplashRouter = createTRPCRouter({
  getImage: publicProcedure.query(async () => {
    const image = (await fetch(url, {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
      },
      cache: "no-cache",
    }).then((res) => res.json())) as UnsplashImage;

    return image;
  }),
});

export interface UnsplashImage {
  id: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string;
  alt_description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This won't really be used anyway
  breadcrumbs: any[];
  urls: Urls;
  links: ImageLinks;
  likes: number;
  liked_by_user: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This won't really be used anyway
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: ImageTopicSubmissions;
  user: User;
  exif: Exif;
  location: Location;
  meta: Meta;
  public_domain: boolean;
  tags: Tag[];
  tags_preview: TagsPreview[];
  views: number;
  downloads: number;
  topics: Topic[];
}

export interface Exif {
  make: string;
  model: string;
  name: string;
  exposure_time: string;
  aperture: string;
  focal_length: string;
  iso: number;
}

export interface ImageLinks {
  self: string;
  html: string;
  download: string;
  download_location: string;
}

export interface Location {
  name: string;
  city: string;
  country: string;
  position: Position;
}

export interface Position {
  latitude: number;
  longitude: number;
}

export interface Meta {
  index: boolean;
}

export interface Tag {
  type: Type;
  title: string;
  source?: TagSource;
}

export interface TagSource {
  ancestry: PurpleAncestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: PurpleCoverPhoto;
}

export interface PurpleAncestry {
  type: Category;
  category: Category;
  subcategory?: Category;
}

export interface Category {
  slug: string;
  pretty_slug: string;
}

export interface PurpleCoverPhoto {
  id: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: Date | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  alt_description: string;
  breadcrumbs: Breadcrumb[];
  urls: Urls;
  links: ImageLinks;
  likes: number;
  liked_by_user: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This won't really be used anyway
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: CoverPhotoTopicSubmissions;
  premium: boolean;
  plus: boolean;
  user: User;
}

export interface Breadcrumb {
  slug: string;
  title: string;
  index: number;
  type: Type;
}

export enum Type {
  LandingPage = "landing_page",
  Search = "search",
}

export interface CoverPhotoTopicSubmissions {
  wallpapers?: Nature;
}

export interface Nature {
  status: string;
  approved_on: Date;
}

export interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}

export interface User {
  id: string;
  updated_at: Date;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: null | string;
  location: null | string;
  links: UserLinks;
  profile_image: ProfileImage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
  total_promoted_photos?: number;
}

export interface UserLinks {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}

export interface ProfileImage {
  small: string;
  medium: string;
  large: string;
}

export interface Social {
  instagram_username: string;
  portfolio_url: null | string;
  twitter_username: null | string;
  paypal_email: null;
}

export interface TagsPreview {
  type: Type;
  title: string;
  source?: TagsPreviewSource;
}

export interface TagsPreviewSource {
  ancestry: FluffyAncestry;
  title: string;
  subtitle: string;
  description: string;
  meta_title: string;
  meta_description: string;
  cover_photo: FluffyCoverPhoto;
}

export interface FluffyAncestry {
  type: Category;
  category: Category;
}

export interface FluffyCoverPhoto {
  id: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  promoted_at: null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null;
  alt_description: string;
  breadcrumbs: Breadcrumb[];
  urls: Urls;
  links: ImageLinks;
  likes: number;
  liked_by_user: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- This won't really be used anyway
  current_user_collections: any[];
  sponsorship: null;
  topic_submissions: CoverPhotoTopicSubmissions;
  premium: boolean;
  plus: boolean;
  user: User;
}

export interface ImageTopicSubmissions {
  nature: Nature;
}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  visibility: string;
}
