import { useContext } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import defaultImage from "public/user-template.png";
import { PostContext } from "context";
import { PostwittInterface } from "interfaces";
import { NewPostwitt, Postwitt, LoadingPostwitts } from "components";
import { useLoadPostwitts, useNearScreen, useTranslation } from "hooks";

export const Feed = () => {
  const { data: session } = useSession();
  const { setModalLeftMenuIsOpen } = useContext(PostContext);
  const { t } = useTranslation();
  const { postwitts, loading, loadNextPage, hasMore } = useLoadPostwitts();
  const { obsRef } = useNearScreen({
    loading,
    loadNextPage,
    hasMore,
  });

  return (
    <div className="border-l border-r border-custom-secondary min-h-full">
      <div className="text-custom-text flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-custom-primary opacity-95">
        <span className="phone:hidden xl:mr-2.5 mr-5">
          <Image
            height={28}
            width={28}
            onClick={() => setModalLeftMenuIsOpen(true)}
            src={session?.user.image ? session?.user.image : defaultImage}
            className="rounded-full"
            alt=""
          />
        </span>
        <h2 className="text-lg sm:text-xl font-bold">{t("home")}</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <AutoAwesomeOutlinedIcon className="h-5 text-custom-text" />
        </div>
      </div>
      <div className="hidden phone:flex">{session && <NewPostwitt />}</div>
      <div className="pb-72 border-t border-custom-secondary relative">
        {postwitts.length > 0 && (
          <>
            {postwitts.map((postwitt: PostwittInterface) => {
              return (
                <Postwitt
                  key={postwitt.id}
                  postwittId={postwitt.id}
                  postwitt={postwitt}
                  repostedBy={postwitt.repostedBy}
                  idOriginal={postwitt.idOriginal}
                  timePostedOriginal={postwitt.timePostedOriginal}
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
