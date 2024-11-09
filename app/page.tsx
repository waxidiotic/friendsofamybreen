import Post from "@/components/post";

export default async function Index() {
  return (
    <>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        <Post />
      </ul>
    </>
  );
}
