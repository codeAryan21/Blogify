import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RTE, Button, Select, Input, } from "../index"
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import appwriteService from '../../appwrite/file'
import databaseService from '../../appwrite/configuration'
import Chatbot from "../ChatBot";
import { FaD } from 'react-icons/fa6'


function PostForm({ post }) {
    const isLoggedIn = useSelector(state => state.auth.status);

    // This control is pass as it is in the RTE 
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.$id || "",
            status: post?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData);
    console.log('User Data:', userData);

    const submit = async (data) => {
        if (!userData) {
            console.error("User is not logged in");
            alert("You must be logged in to create a post.");
            return;
        }

        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null

            if (file) {
                appwriteService.deleteFile(post.featuredImage)
            }

            const dbPost = await databaseService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            // we have nothing to update here user want to create new form 
            try {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    const fileId = file.$id;
                    data.featuredImage = fileId;

                    const dbPost = await databaseService.createPost({
                        ...data,
                        userId: userData.$id,
                    });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            } catch (error) {
                console.error("Error creating post:", error);
            }

        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value == "string") {
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        return "" // else return empty string
    }, [])


    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name == 'title' && value?.title) {
                setValue('slug', slugTransform(value?.title), { shouldValidate: true })
            }
        })

        // this is for memory management and optimization
        return () => {
            subscription.unsubscribe();
        }
    }, [slugTransform, setValue, watch])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-col lg:flex-row gap-6 max-w-8xl mx-auto px-2 sm:px-4">
            {/* Main content area */}
            <div className="w-full lg:w-2/3 mb-6 lg:mb-0">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>

            {/* Sidebar area */}
            <div className="w-full lg:w-1/3 flex flex-col">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                { isLoggedIn && (
                    <div className="mb-4 w-full">
                        <Chatbot className="w-full" />
                    </div>
                )}

                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>

            </div>
        </form>
    )
}

export default PostForm   