import axios from "axios";

interface IValue {
  id: number;
  name: string;
  caption: string;
}

export function getPosts() {
  return axios
    .get("http://localhost:3000/posts")
    .then((res) => res.data);
}

export function getPost(id: any) {
  return axios.get(`http://localhost:3000/posts/${id}`).then((res) => res.data);
}

export function createPost( prop : IValue) {
    return axios
      .post("http://localhost:3000/posts", {
        ...prop,
      })
      .then(res => res.data)
  }