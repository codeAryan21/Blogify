import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, PostCard } from '../components';

function AllPosts() {
    const [posts, setposts] = useState({ documents: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getAllPost().then((posts) => {
            console.log("Posts:", posts);
            if (posts) {
                setposts(posts);
            }
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching posts:", error);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return <p className='text-3xl font-bold text-center mt-16'>Loading posts...</p>;
    }
    
    return (
        <div className='w-full py-8'>
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {posts.documents.map((post) => (
                        <div key={post.$id} className="h-full">
                            <PostCard
                                $id={post.$id}
                                title={post.title}
                                featuredImage={post.featuredImage}
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts;