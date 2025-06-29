import React from 'react'
import appwriteService from '../appwrite/file' 
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {

    console.log("Featured Image ID:", featuredImage);
    const imageUrl = featuredImage ? appwriteService.getFilePreview(featuredImage) : "Featured Image";
    console.log("Image URL:", imageUrl);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-orange-200 rounded-xl p-4 flex flex-col h-full'>
                <div className='w-full justify-center mb-4 flex-grow'>
                    {featuredImage ? (
                        <img
                            src={appwriteService.getFilePreview(featuredImage)}
                            alt={title || 'Post Image'}
                            className='rounded-xl object-cover w-full h-40'
                        />
                    ) : (
                        <div className="w-full h-40 bg-orange-50 flex items-center justify-center rounded-xl text-slate-500">
                            No Image
                        </div>
                    )}
                </div>
                <h2 className='text-xl text-slate-800 font-bold line-clamp-2'>{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard