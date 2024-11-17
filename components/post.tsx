import { Post as IPost } from "@/types/db.types";
import { formatTimestamp } from "@/utils/utils";

export const Post = ({ post }: { post: IPost }) => {
  return (
    <li className="py-12">
      <article>
        <div className="space-y-2 space-x-4 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-muted-foreground">
              <time dateTime={post.created_at}>
                {formatTimestamp(post.created_at)}
              </time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-light">
                  <a href="/blog" className="text-primary">
                    {post.title}
                  </a>
                </h2>
              </div>
              <div className="prose max-w-none text-foreground">
                {post.body}
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};
