"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetProgrammingLanguage from "@/features/home/api/use-get-programming-language";
import useGetSearchRepositories from "@/features/home/api/use-get-search-repositories";
import { ReactNode, useMemo, useState } from "react";

export default function Home() {
  const { data } = useGetProgrammingLanguage();

  const [language, setLanguage] = useState("");

  const [valueRandom, setValueRanDom] = useState(Math.random());

  console.log("valueRandom", valueRandom);

  const {
    data: dataSearchRepositories,
    isFetching: isFetchingSearchRepositories,
    refetch,
  } = useGetSearchRepositories(
    {
      q: `language:${language}`,
    },
    {
      enabled: !!language,
      refetchOnWindowFocus: false,
    }
  );

  const getContent = (): string | ReactNode => {
    if (!language)
      return (
        <div className="h-[100px] w-[300px] bg-neutral-100 rounded-2xl flex items-center justify-center">
          Please select a language
        </div>
      );

    if (isFetchingSearchRepositories)
      return (
        <div className="h-[100px] w-[300px] bg-neutral-100 rounded-2xl flex items-center justify-center">
          Loading, please wait...
        </div>
      );

    return (
      <>
        <div className="h-[100px] w-[300px] bg-neutral-100 rounded-2xl flex items-center justify-center">
          Error fetching repositories
        </div>
        <Button
          variant={"destructive"}
          className="w-[300px]"
          onClick={() => refetch()}
        >
          Click to retry
        </Button>
      </>
    );
  };

  const content = getContent();

  const repoActive = useMemo(() => {
    if (!dataSearchRepositories?.items?.length) return null;

    return dataSearchRepositories?.items[
      Math.floor(valueRandom * dataSearchRepositories?.items?.length)
    ];
  }, [valueRandom, dataSearchRepositories]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        {data?.length && (
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value)}
          >
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              {data
                .filter((item) => !!item.value)
                .map((option, index) => (
                  <SelectItem value={option.value} key={index}>
                    {option.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        )}
        {dataSearchRepositories?.items?.length ? (
          <>
            <div className="flex flex-col gap-1 h-[100px] w-[300px] border-[1px] border-solid border-black p-1 rounded-2xl">
              <div>{repoActive?.name}</div>
              <div className="flex-1 text-[10px] text-neutral-600 line-clamp-3 break-word">
                {repoActive?.description}
              </div>
              <div className="text-[10px]">{repoActive?.language}</div>
            </div>
            <Button
              className="w-[300px]"
              onClick={() => setValueRanDom(Math.random())}
            >
              Refresh
            </Button>
          </>
        ) : (
          content
        )}
      </main>
    </div>
  );
}
