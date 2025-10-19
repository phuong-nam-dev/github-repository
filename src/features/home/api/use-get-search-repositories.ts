import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export type SearchRepositoriesParams = {
  q: string;
};

export type RepositoriesItem = {
  name: string;
  description: string;
  language: string;
};

export type SearchRepositoriesResponse = {
  incomplete_results: boolean;
  items: RepositoriesItem[];
  total_count: number;
};

export const getSearchRepositories = async (
  params: SearchRepositoriesParams
) => {
  const queryString = new URLSearchParams(params).toString();

  const response = await fetch(
    `https://api.github.com/search/repositories?${queryString}`
  );

  return await response.json();
};

const useGetSearchRepositories = (
  params: SearchRepositoriesParams,
  options?: Omit<
    UseQueryOptions<unknown, Error, SearchRepositoriesResponse>,
    "queryKey"
  >
) => {
  return useQuery({
    queryKey: ["search-repositories", params],
    queryFn: () => getSearchRepositories(params),
    ...options,
  });
};

export default useGetSearchRepositories;
