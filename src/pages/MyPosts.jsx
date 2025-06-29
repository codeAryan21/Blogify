import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/configuration';
import { Container, PostCard } from '../components';
import { account } from '../appwrite/configuration';

function MyPosts() {
    const [posts, setPosts] = useState({ documents: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get current user
        account.get().then(user => {
            // Fetch posts by user ID
            appwriteService.getPostsByUser(user.$id).then((posts) => {
                setPosts(posts || { documents: [] });
                setLoading(false);
            });
        }).catch(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className='text-3xl font-bold text-center mt-16'>Loading your posts...</p>;
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <h2 className="text-2xl font-bold mb-6 text-teal-700">My Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {posts.documents.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500">No posts found.</p>
                    ) : (
                        posts.documents.map((post) => (
                            <div key={post.$id} className="h-full">
                                <PostCard
                                    $id={post.$id}
                                    title={post.title}
                                    featuredImage={post.featuredImage}
                                />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}

export default MyPosts;