import { PageTitle } from "@/components/page-title";
import { Post } from "@/components/post";
import { getPosts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = await createClient();
  const posts = await getPosts(supabase);

  return (
    <>
      <PageTitle title="Latest" />
      <ul className="divide-y divide-muted-foreground">
        {posts?.length ? (
          posts?.map((post) => <Post key={post.id} post={post} />)
        ) : (
          <div>
            <p>No posts found</p>
          </div>
        )}
      </ul>
    </>
  );
}
