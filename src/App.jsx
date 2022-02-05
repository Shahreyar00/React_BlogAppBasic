import { useEffect, useState } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from './components/Footer';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from "./components/Home";
import { format } from 'date-fns';
import NewPost from "./components/NewPost";
import PostPage from "./components/PostPage";
import About from "./components/About";

const App = () => {
    const [posts, setPosts] = useState([
        {
          id: 1,
          title: "My First Post",
          datetime: "July 01, 2021 11:17:36 AM",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
          id: 2,
          title: "My 2nd Post",
          datetime: "July 01, 2021 11:17:36 AM",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
          id: 3,
          title: "My 3rd Post",
          datetime: "July 01, 2021 11:17:36 AM",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        },
        {
          id: 4,
          title: "My Fourth Post",
          datetime: "July 01, 2021 11:17:36 AM",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
        }
    ])
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const savedPosts=JSON.parse(localStorage.getItem("blog-app-data"));
        if(savedPosts){
            setPosts(savedPosts);
        }
    },[])
    
    useEffect(()=>{
        localStorage.setItem("blog-app-data",JSON.stringify(posts));
    },[posts]);

    useEffect(()=>{
        const filteredResults = posts.filter((post)=>
            ((post.body).toLowerCase()).includes(search.toLowerCase()) 
            || ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
        setSearchResults(filteredResults.reverse());
    },[posts,search]);


    const handleSubmit = (e) =>{
        e.preventDefault();
        const id = posts.length?posts[posts.length-1].id+1:1;
        const datetime = format(new Date(),'dd MMMM, yyyy pp');
        const newPost = {id,title:postTitle,datetime,body:postBody};
        const allPosts = [...posts,newPost];
        setPosts(allPosts);
        setPostTitle("");
        setPostBody("");
        navigate("/");
    }

    const handleDelete = (id) =>{
        const postsList = posts.filter((post)=>post.id!==id);
        setPosts(postsList);
        navigate("/");
    };

    return (
        <div className="App">
            <Header title="ReactJs Blog App" />
            <Nav search={search} setSearch={setSearch} />
            <Routes>
                <Route path="/" element={<Home posts={searchResults} />} />
                <Route path="/post" 
                    element={
                        <NewPost 
                            handleSubmit={handleSubmit} 
                            postTitle={postTitle}  
                            setPostTitle={setPostTitle}
                            postBody={postBody}
                            setPostBody={setPostBody}
                        />
                    } 
                />
                <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
                <Route path="/about" element={<About/>} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
