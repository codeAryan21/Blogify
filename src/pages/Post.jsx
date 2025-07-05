import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import fileService from "../appwrite/file";
import { Button, Container, Input } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Heart, HeartOff, Share2, Trash2 } from "lucide-react";

export default function Post() {
    const [post, setPost] = useState(null);
    const [liked, setLiked] = useState(false);
    const [commentText, setCommentText] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            console.log("Slug from URL:", slug);
            appwriteService.getPost(slug).then((post) => {
                console.log("Post is :", post)
                if (post) {
                    console.log("Featured image :", post.featuredImage)
                    console.log(
                        "Image preview URL:",
                        post?.featuredImage ? fileService.getFilePreview(post.featuredImage) : "No post yet"
                    );
                    setPost(post)
                    setLiked(post.likes?.includes(userData?.$id));
                } else {
                    navigate("/")
                }
            });
        } else {
            navigate("/")
        }
        // eslint-disable-next-line
    }, [slug, navigate, userData?.$id]);

    // Like / Unlike handler
    const handleLike = async () => {
        if (!userData) return alert("Login first!");
        try {
            const updated = await appwriteService.toggleLike(
                post.$id,
                userData.$id,
                post.likes || []
            );
            setPost(updated);
            setLiked(updated.likes.includes(userData.$id));
        } catch (err) {
            console.error("Error toggling like:", err);
        }
    };

    // Share handler
    const handleShare = async () => {
        const url = window.location.href;
        try {
            if (navigator.share) {
                await navigator.share({ title: post.title, url });
            } else {
                await navigator.clipboard.writeText(url);
                alert("Post link copied to clipboard!");
            }
        } catch (err) {
            console.error("Sharing failed:", err);
        }
    };

    // Submit comment
    const submitComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;
        if (!userData) return alert("Login first!");

        const newComment = {
            userId: userData.$id,
            userName: userData.name || userData.email,
            text: commentText,
            createdAt: new Date().toISOString(),
        };

        try {
            const updated = await appwriteService.addComment(
                post.$id,
                post.comments || [],
                newComment
            );
            setPost(updated);
            setCommentText("");
        } catch (err) {
            console.error("Error adding comment:", err);
        }
    };

    // Parse comments before rendering
    const parsedComments = (post?.comments || []).map(c =>
        typeof c === "string" ? JSON.parse(c) : c
    );

    // Delete comment
    const deleteComment = async (commentCreatedAt) => {
        try {
            const updated = await appwriteService.deleteComment(
                post.$id,
                post.comments || [],
                commentCreatedAt
            );
            setPost(updated);
        } catch (err) {
            console.error("Error deleting comment:", err);
        }
    };

    // Delete Post
    const deletePost = async () => {
        try {
            // Delete the post document first
            const status = await appwriteService.deletePost(post.$id);
            if (status) {
                // Then delete the image file if it exists
                if (post.featuredImage) {
                    await fileService.deleteFile(post.featuredImage);
                }
                navigate("/");
            }
        } catch (error) {
            console.error("Error deleting post:", error);
            alert("Failed to delete post.");
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                {/* Post image */}
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {post.featuredImage && (
                        <img
                            src={fileService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl h-full w-max-50"
                        />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-blue-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>

                            <Button bgColor="bg-red-500 hover:bg-red-600" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>

                {/* Actions: Like + Share */}
                <div className="flex justify-end gap-4 mb-8">
                    <Button
                        type="button"
                        onClick={handleLike}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold shadow transition ${liked
                            ? "bg-pink-200 text-pink-600 hover:bg-pink-300"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        {liked ? <Heart className="text-pink-500 fill-pink-500" size={20} /> : <HeartOff size={20} />}
                        <span>{liked ? "Unlike" : "Like"}</span>
                        <span className="text-xs">({post.likes?.length || 0})</span>
                    </Button>
                    <Button
                        type="button"
                        onClick={handleShare}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full font-semibold shadow bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                        <Share2 size={20} />
                        <span>Share</span>
                    </Button>
                </div>

                {/* Post title + metadata */}
                <h1 className="text-3xl font-bold text-center mb-2">{post.title}</h1>
                <p className="text-sm text-center text-gray-500 mb-6">
                    By <span className="font-semibold">{post.ownerName}</span> •{" "}
                    {new Date(post.$createdAt).toLocaleString()}
                </p>

                {/* Post content */}
                <div className="browser-css text-2xl mb-10 bg-white p-6 rounded-xl shadow">
                    <p className="font-bold">Content: </p>
                    {parse(post.content)}
                </div>

                {/* Comments */}
                <section className="max-w-2xl mx-auto bg-white rounded-xl p-6 shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        💬 Comments <span className="text-base text-gray-400">({parsedComments.length})</span>
                    </h2>

                    {parsedComments.length === 0 && (
                        <p className="text-gray-400 text-center mb-4">No comments yet. Be the first to comment!</p>
                    )}

                    <div className="space-y-4 mb-4">
                        {parsedComments.map((c, i) => (
                            <div key={i} className="border-b pb-2">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-gray-700">{c.userName}</span>
                                    <span className="text-xs text-gray-400">
                                        {new Date(c.createdAt).toLocaleString()}
                                    </span>
                                    {(userData?.$id === c.userId || isAuthor) && (
                                        <button
                                            type="button"
                                            onClick={() => deleteComment(c.createdAt)}
                                            className="ml-auto text-red-500 text-xs flex items-center gap-1 hover:underline"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    )}
                                </div>
                                <p className="text-gray-800">{c.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Add comment input */}
                    <form className="flex gap-2 mt-4" onSubmit={submitComment}>
                        <Input
                            className="flex-1"
                            placeholder={userData ? "Add a comment..." : "Login to comment"}
                            value={commentText}
                            onChange={e => setCommentText(e.target.value)}
                            disabled={!userData}
                        />
                        <Button
                            type="submit"
                            disabled={!userData || !commentText.trim()}
                            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-semibold shadow disabled:opacity-60"
                        >
                            Post
                        </Button>
                    </form>
                </section>
            </Container>
        </div>
    ) : null;
}
