import { defineQuery } from 'next-sanity'

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc){
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _createdAt,
    "excerpt": pt::text(body),
    "author": author->name,
    "categories": categories[]->{_id, title},
    "mainImage": mainImage{
      alt,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions{width, height}
    }
  }
`)

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    _createdAt,
    "excerpt": pt::text(body),
    "author": author->name,
    "categories": categories[]->{_id, title},
    "mainImage": mainImage{
      alt,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions{width, height}
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        "asset": asset->{
          url,
          metadata{dimensions}
        }
      }
    }
  }
`)

export const SITEMAP_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current,
    publishedAt,
    _updatedAt
  }
`)