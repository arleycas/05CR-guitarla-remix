import Post from "~/components/Post";

export default function ListadoPosts({arrPosts}) {
  return (
    <>
      <h2 className="heading">Blog</h2>

      <div className="blog">
        {
          arrPosts.map(post => (
            <Post 
              key={post.id}
              post={post}
              />
          ))
        }
      </div>
    </>
  )
}
