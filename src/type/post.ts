export type PostDto = {
  id: number;
  createDate: string;
  modifyDate: string;
  title: string;
};

export type PostWithContentDto = PostDto & {
  content: string;
};
