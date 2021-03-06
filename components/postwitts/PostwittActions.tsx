import { useContext } from "react";
import { useSession } from "next-auth/react";
import { DocumentData } from "firebase/firestore";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { PostContext, PostContextProps } from "context";
import { likePostwitt, repostPostwitt } from "@f/index";
import { MenuSharePostwitt } from "components";
import { useRouter } from "next/router";

interface Props {
  uid: string;
  id: string;
  postPage?: boolean;
  commentId?: string;
  likes: DocumentData[];
  reposts: DocumentData[];
  liked?: boolean;
  reposted?: boolean;
  replies: DocumentData[];
}

export const PostwittActions = ({
  id,
  postPage,
  likes,
  liked,
  reposted,
  reposts,
  replies,
}: Props) => {
  const { setModalReplyIsOpen, setPostwittId } =
    useContext<PostContextProps>(PostContext);
  const { data: session } = useSession<boolean>();
  const router = useRouter();

  return (
    <div
      className={`text-custom-placeholder flex justify-between w-10/12 relative ${
        postPage && "mx-auto"
      }`}
    >
      <div
        className="flex items-center space-x-1 group"
        onClick={(e) => {
          e.preventDefault();
          if (!session) return router.push("/auth/login");
          setPostwittId(id);
          setModalReplyIsOpen(true);
        }}
      >
        <div className="icon">
          <ModeCommentOutlinedIcon className="group-hover:text-custom-link" />
        </div>
        {replies.length > 0 && (
          <span className="group-hover:text-custom-link text-sm">
            {replies.length}
          </span>
        )}
      </div>
      <div
        className="flex items-center space-x-1 group"
        onClick={async (e) => {
          e.preventDefault();
          if (!session) return router.push("/auth/login");
          repostPostwitt(id, session.user, reposted);
        }}
      >
        <span className="icon-alt group-hover:bg-green-500/20 dark:group-hover:bg-green-500/10">
          <RepeatOutlinedIcon
            className={`h-5 group-hover:text-green-500 ${
              reposted && " text-green-600"
            }`}
          />
        </span>
        {reposts.length > 0 && (
          <span
            className={`group-hover:text-green-500 text-sm ${
              reposted && "text-green-600"
            }`}
          >
            {reposts.length}
          </span>
        )}
      </div>
      <div
        className="flex items-center space-x-1 group"
        onClick={async (e) => {
          e.preventDefault();
          if (!session) return router.push("/auth/login");
          likePostwitt(id, session.user, liked);
        }}
      >
        <div className="icon-alt group-hover:bg-pink-600/20 dark:group-hover:bg-pink-600/10">
          {liked ? (
            <FavoriteIcon className="h-5 text-pink-600" />
          ) : (
            <FavoriteBorderIcon className="h-5 group-hover:!text-pink-500 group-hover:!bg-opacity-100" />
          )}
        </div>
        {likes.length > 0 && (
          <span
            className={`group-hover:text-pink-600 text-sm ${
              liked && "text-pink-600"
            }`}
          >
            {likes.length}
          </span>
        )}
      </div>
      <MenuSharePostwitt postwittId={id} />
    </div>
  );
};
