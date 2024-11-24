import { Post as PostType } from "@/types";
import { formatTimestamp } from "@/utils/utils";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import type { JSONContent } from "@tiptap/react";

export const Post = ({ post }: { post: PostType }) => {
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
                <div
                  dangerouslySetInnerHTML={{
                    __html: generateHTML(post.body_json as JSONContent, [
                      StarterKit,
                    ]),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
};
