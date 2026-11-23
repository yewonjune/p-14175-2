"use client";

import { apiFetch } from "@/lib/backend/client";
import type { PostWithContentDto } from "@/type/post";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function usePost(id: number) {
  const [post, setPost] = useState<PostWithContentDto | null>(null);

  useEffect(() => {
    apiFetch(`/api/v1/posts/${id}`)
      .then(setPost)
      .catch((error) => {
        alert(`${error.resultCode} : ${error.msg}`);
      });
  }, [id]);

  return {
    post,
  };
}

function PostInfo({ postState }: { postState: ReturnType<typeof usePost> }) {
  const { post } = postState;

  if (post == null) return <div>로딩중...</div>;

  return (
    <>
      <div>번호 : {post.id}</div>
      <div>제목: {post.title}</div>
      <div style={{ whiteSpace: "pre-line" }}>{post.content}</div>
    </>
  );
}

export default function Page() {
  const { id: idStr } = useParams<{ id: string }>();
  const id = Number(idStr);

  const postState = usePost(id);

  return (
    <>
      <h1>글 상세페이지</h1>

      <PostInfo postState={postState} />
    </>
  );
}
