import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container } from "../components";

function Home() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  return (
    <div className="w-full py-16 text-center">
      <Container>
        <div className="bg-teal-50 border border-teal-200 p-8 rounded-2xl shadow-md max-w-2xl mx-auto">
          {isLoggedIn ? (
            <>
              <h1 className="text-3xl font-semibold text-teal-800 mb-4">
                Welcome{userData?.name ? `, ${userData.name}` : ""}! 👋
              </h1>
              <p className="text-lg text-gray-700 mb-2">
                Ready to explore blogs from our community?
              </p>
              <p className="text-lg text-gray-700">
                👉 Check out{" "}
                <Link to="/all-posts" className="text-teal-600 underline">
                  All Posts
                </Link>{" "}
                or{" "}
                <Link to="/add-post" className="text-teal-600 underline">
                  Create your first blog
                </Link>
                .
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                Welcome to our Blog App!
              </h1>
              <p className="text-lg text-gray-600">
                Please{" "}
                <Link to="/login" className="text-blue-500 underline">
                  log in
                </Link>{" "}
                to get started.
              </p>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}

export default Home;