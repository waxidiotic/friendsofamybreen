import { Post } from "@/components/post";
import { getPosts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = await createClient();
  const posts = await getPosts(supabase);

  return (
    <main className="mb-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-light text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {posts?.length ? (
            posts?.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <div className="py-12">
              <p>No posts found</p>
            </div>
          )}
        </ul>
      </div>
    </main>
  );
}
