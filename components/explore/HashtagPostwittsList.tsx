import { PostwittInterface } from "interfaces/index";
import { Postwitt, LoadingPostwitts } from "components";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import { useLoadHashtagPostwitts, useNearScreen } from "hooks";
export const HashtagPostwittsList = ({ hashtag }) => {
  const router = useRouter();
  const { postwitts, loading, loadNextPage, hasMore } = useLoadHashtagPostwitts(
    { hashtag }
  );
  const { obsRef } = useNearScreen({
    loading,
    loadNextPage,
    hasMore,
  });

  return (
    <div className=" border-l border-r border-custom-secondary min-h-full">
      <div
        className="flex items-center px-1.5 py-2 border-b border-custom-secondary text-custom-text font-semibold 
        text-xl gap-x-4 sticky top-0 z-50 bg-custom-primary"
      >
        <div
          className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
          onClick={() => {
            router.back();
            router.push("/");
          }}
        >
          <ArrowBackIcon className="h-5 text-custom-text" />
        </div>
        <div className="flex flex-col">
          {hashtag}
          <span className="text-custom-placeholder leading-[10px] text-[13px]">
            {postwitts.length} Postwitts
          </span>
        </div>
      </div>
      <div className="pb-72">
        {postwitts.length > 0 && (
          <>
            {postwitts.map((postwitt: PostwittInterface) => {
              return (
                <Postwitt
                  key={postwitt.id}
                  postwittId={postwitt.id}
                  postwitt={postwitt}
                />
              );
            })}
            <div id="visor" ref={obsRef}></div>
          </>
        )}
        {loading && <LoadingPostwitts />}
      </div>
    </div>
  );
};
