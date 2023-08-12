import PostForm from "@/components/post/CreatePost";
import Toolbar from "@/components/post/toolbar/Toolbar";

export default function NewPost() {
    return (
        <div className="relative">
            <Toolbar />
            <PostForm />
        </div>
    )
}