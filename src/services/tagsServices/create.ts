interface CreateTagParams {
  title: string;
  slug: string;
}

export async function create({ title, slug }: CreateTagParams) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  await fetch("http://localhost:3333/tags", {
    method: "POST",
    body: JSON.stringify({
      title,
      slug,
      amountOfVideos: 0
    })
  });
}
