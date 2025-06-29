import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configuration";
import fileService from "../appwrite/file";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
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
                } else {
                    navigate("/")
                }
            });
        } else {
            navigate("/")
        }
    }, [slug, navigate]);

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

                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold text-center">{post.title}</h1>
                </div>

                <div className="browser-css text-center">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}