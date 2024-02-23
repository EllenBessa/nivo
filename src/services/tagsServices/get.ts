export interface GetTagsParams {
  page: number;
  title: string;
}

interface Tag {
  id: string;
  title: string;
  slug: string;
  amountOfVideos: number;
}

interface GetTagsResponse {
  first: number;
  prev: number | null;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: Tag[];
}

export async function get({
  page,
  title
}: GetTagsParams): Promise<GetTagsResponse> {
  const response = await fetch(
    `http://localhost:3333/tags?_page=${page}_per_page=10&title=${title}`
  );
  const data = await response.json();

  return data;
}
