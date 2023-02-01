import { Outlet } from "@remix-run/react";
import styles from '~/styles/blog.css'

export const links = () => ([
  {
    rel: 'stylesheet',
    href: styles
  }
]);

export default function Blog() {
  return (
    <main className="contenedor">
      <Outlet />
    </main>
  )
}
