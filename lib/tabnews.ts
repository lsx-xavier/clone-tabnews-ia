const PUBLISHED_CONTENTS_URL =
  "https://www.tabnews.com.br/api/v1/contents?strategy=new&page=1&per_page=1";

const COUNT_REVALIDATE_SECONDS = 60;

export async function getPublishedContentCount(): Promise<number> {
  const response = await fetch(PUBLISHED_CONTENTS_URL, {
    next: { revalidate: COUNT_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(8000),
    headers: {
      Accept: "application/json",
      "User-Agent": "clone-tabnews-ia",
    },
  });

  if (!response.ok) {
    throw new Error(`TabNews API respondeu ${response.status}`);
  }

  const total = Number(response.headers.get("x-pagination-total-rows"));

  if (!Number.isInteger(total) || total < 0) {
    throw new Error("Total de conteúdos ausente na resposta da API");
  }

  return total;
}
