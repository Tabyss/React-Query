import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { createPost, getPosts } from "./api/post";

function Create() {
  const [name, setName] = useState("");
  const [caption, setCaption] = useState("");
  const allPostQuery = useQuery({
    queryKey: ["posts"], // -> untuk memberikan unique
    queryFn: () => getPosts(),
  });

  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: (data: any) => {
      queryClient.setQueryData(["posts", data.id], data);
      queryClient.invalidateQueries(["posts"], { exact: true });
    },
  });

  const handleSubmit = () => {
    createPostMutation.mutate({
      id: getPosts.length,
      name: name,
      caption: caption,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Caption</label>
        <input
          type="text"
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
      <button>Create</button>
    </form>
  );
}

export default Create;
