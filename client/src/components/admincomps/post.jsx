import React, { useState, useRef, useMemo, useCallback } from 'react';
import axios from 'axios'

function AdminPost() {
  const [title, setTitle] = useState(""); //there is 100% a better way other than using 5 useStates but I am tired
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [theme, setTheme] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  let handleSubmit = async (e) =>{
    e.preventDefault()
    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("author", author)
    formData.append("theme", theme)
    formData.append("thumbnail", thumbnail)
    await axios.post("http://localhost:3000/post", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name='title' onChange={e => setTitle(e.target.value)} />
        <textarea name="content" onChange={e => setContent(e.target.value)}></textarea>
        <input type="file" name="thumbnail" accept="image/*" onChange={e => setThumbnail(e.target.files[0])} />
        <input type="text" name='theme' onChange={e => setTheme(e.target.value)}/>
        <input type="text" name='author' onChange={e => setAuthor(e.target.value)}/>
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default AdminPost