import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type LanguageOption = {
  title: string;
  value: string;
};

export const getProgrammingLanguage = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json",
      {
        cache: "force-cache",
      }
    );

    return await response.json();
  } catch {
    return undefined;
  }
};

const useGetProgrammingLanguage = (
  options?: Omit<UseQueryOptions<unknown, Error, LanguageOption[]>, "queryKey">
) => {
  return useQuery({
    queryKey: ["programming-language"],
    queryFn: () => getProgrammingLanguage(),
    ...options,
  });
};

export default useGetProgrammingLanguage;
