import { useQuery, useMutation } from "@tanstack/react-query";
import { getPost, getPosts } from "./api/post";
import { useState } from "react";
import Create from "./Create";

function App() {
  const [create, setCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [id, setId] = useState(0);
  const allPostQuery = useQuery({
    queryKey: ["posts"], // -> untuk memberikan unique
    queryFn: () => getPosts(),
  });
  const postQuery = useQuery({
    queryKey: ["posts", currentPage], // -> untuk memberikan unique
    queryFn: () => getPost(currentPage),
  });

  const nameQuery = useQuery({
    queryKey: ["name", postQuery?.data?.id], // -> untuk memberikan unique
    enabled: postQuery?.data?.id != null,
    queryFn: () => getPost(postQuery.data.id),
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>;
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>;

  // const postMutation = useMutation({
  //   mutationFn: (name : any, id: any) => {return(POSTS.push(id, name))}
  // })

  const prev = (currentPage: any) => {
    if (currentPage < 2) {
      setCurrentPage(allPostQuery.data.length);
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const next = (currentPage: any) => {
    if (currentPage < allPostQuery.data.length) {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(1);
    }
  };

  console.log(allPostQuery.data);

  return (
    <div>
      <h1>Test Query Fetch</h1>
      <h2>
        {" "}
        {nameQuery.isLoading
          ? "Loading User..."
          : nameQuery.isError
          ? "Error Loading User"
          : nameQuery.data.name}
      </h2>
      <p>{postQuery.data.caption}</p>
      <button onClick={() => prev(currentPage)}>prev</button>
      <button onClick={() => next(currentPage)}>next</button>
      <button onClick={() => setCreate(!create)}>create</button>
      {create ? <Create /> : null}
    </div>
  );
}

export default App;
