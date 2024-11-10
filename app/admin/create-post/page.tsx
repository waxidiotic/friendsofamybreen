import { CreatePost } from "@/components/create-post";

export default async function Index() {
  return (
    <div className="mb-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-light text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Create Post
          </h1>
        </div>
        <CreatePost />
      </div>
    </div>
  );
}
