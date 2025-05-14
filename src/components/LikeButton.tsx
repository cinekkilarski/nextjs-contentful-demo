"use client";

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return (
    <div className="mt-6">
      <button
        onClick={() => setLikes(likes + 1)}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
      >
        ❤️ Like ({likes})
      </button>

      {likes > 0 && (
        <p className="mt-2 text-sm text-gray-600">
          Thanks for the {likes} {likes === 1 ? "like" : "likes"}!
        </p>
      )}
    </div>
  );
}
