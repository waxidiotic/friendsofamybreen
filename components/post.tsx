export default function Post() {
  return (
    <li className="py-12">
      <article>
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          <dl>
            <dt className="sr-only">Published on</dt>
            <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
              <time dateTime="2023-08-05T00:00:00.000Z">August 5, 2023</time>
            </dd>
          </dl>
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-light">
                  <a href="/blog" className="text-gray-900 dark:gray-100">
                    Title of the Post
                  </a>
                </h2>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400"></div>
            </div>
            <div className="text-base font-medium leading-6">
              <a
                href="/link"
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              >
                Read more →
              </a>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
