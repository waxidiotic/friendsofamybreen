import { CreatePost } from "@/components/create-post";
import { PageTitle } from "@/components/page-title";

export default async function Index() {
  return (
    <>
      <PageTitle title="Create Post" />
      <CreatePost />
    </>
  );
}
