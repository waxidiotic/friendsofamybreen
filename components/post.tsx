import { Post as IPost } from "@/types/db.types";
import { formatTimestamp } from "@/utils/utils";

export const Post = ({ post }: { post: IPost }) => {
  return (
    <li className="py-12">
      <article>
        <div className="space-y-2 space-x-4 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime={post.created_at}>
                {formatTimestamp(post.created_at)}
              </time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-light">
                  <a href="/blog" className="text-gray-900 dark:text-gray-100">
                    {post.title}
                  </a>
                </h2>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                {post.body}
              </div>
            </div>
            {/* <div className="text-base font-medium leading-6">
              <a
                href="/link"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Read more →
              </a>
            </div> */}
          </div>
        </div>
      </article>
    </li>
  );
};
