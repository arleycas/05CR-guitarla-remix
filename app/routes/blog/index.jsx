import { useLoaderData } from "@remix-run/react";
import { getPosts } from "~/models/posts.server";
import styles from '~/styles/blog.css'
import ListadoPosts from "~/components/ListadoPosts";

export const meta = () => ({
  title: `GuitarLA - Nuestro Blog`,
  description: `Blog de musica y venta de guitarras`
});

export const links = () => ([
  {
    rel: 'stylesheet',
    href: styles
  }
]);

export async function loader() {

  const posts = await getPosts();

  return posts.data;
}

export default function Blog() {
  const arrPosts = useLoaderData();

  return (
      <ListadoPosts
        arrPosts={arrPosts} />
  )
}
