import { Paper } from "@material-ui/core";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Input from "../components/searchAndFilters/SearchBox";
import ChipsInput from "../components/searchAndFilters/ChipsInput";
import ModalWindow from "../components/modal/popup.modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Blogs = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal === true) {
    }
  }, [showModal]);
  const tagsRef = useRef();

  const blogs = [
    {
      title: "blog1",
      bannerImage: "https://bit.ly/3Dy3QJ6",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labours",
      tags: ["story", "blog", "article", "page"],
    },
    {
      title: "blog2",
      bannerImage: "https://bit.ly/3NLf81d",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labours",
      tags: ["story", "blog", "article", "page"],
    },
    {
      title: "blog3",
      bannerImage: "https://bit.ly/3J3C4oZ",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labours",
      tags: ["story", "blog", "article", "page"],
    },
    {
      title: "blog4",
      bannerImage: "",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labours",
      tags: ["story", "blog", "article", "page"],
    },
    {
      title: "blog5",
      bannerImage: "",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labours",
      tags: ["story", "blog", "article", "page"],
    },
    {
      title: "blog6",
      bannerImage: "",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est labours",
      tags: ["story", "blog", "article", "page"],
    },
  ];
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <h5>Blogs</h5>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => setShowModal(true)}
        >
          Add blog
        </button>
      </div>
      <div className="d-flex align-items-center justify-content-end my-3">
        <span className="material-icons-outlined text-muted">
          view_headline
        </span>
        <span className="material-icons-outlined text-muted">view_list</span>
      </div>
      <div className="row">
        {blogs.map((blog, index) => (
          <div key={index} className="col-sm-12 col-md-3 mb-4">
            <div
              className="blog_banner_image"
              style={{
                backgroundImage: `url(${
                  blog.bannerImage || "https://bit.ly/35wG17U"
                })`,
              }}
            />
            <Paper elevation={0} square>
              <div className="p-3">
                <h6 className="text-capitalize">{blog.title}</h6>
                <div className="small">{blog.body.substring(0, 100)}</div>
                <div className="mt-3">
                  <span className="small text-capitalize pointer">
                    Read more
                  </span>
                </div>
              </div>
            </Paper>
          </div>
        ))}
      </div>
      {showModal === true && (
        <ModalWindow setShowModal={setShowModal} Widget={BlogForm} />
      )}
    </>
  );
};

export default Blogs;

export const BlogForm = ({ setShowModal }) => {
  const [list, setList] = useState([]);
  const [data, setData] = useState({ title: "", body: "" });
  const uploadRef = useRef();
  const chipRef = useRef();
  const onChange = (e) => {
    if (uploadRef.current === e.target) {
      const file = uploadRef.current.files[0];
      
      setData({ ...data, image: file });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
      console.log(data);
    }
  };
  const onChipDelete = (chip) => {
    const newList = list.filter((item) => item !== chip);
    setList([...newList]);
  };
   const onAddChip = (e) => {
      document.addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          if (chipRef.current.value !== "") {
            console.log(chipRef.current.value);
            setList([...list, chipRef.current.value]);
          }
        }
      });
   }
 const onSubmit = (e) => {
   e.preventDefault();
   
 }
  
  return (
    <form className="form_modal" onSubmit={(e) => onSubmit(e)}>
      <div className="bg-white p-5 rounded">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="mb-3">Add new blog</h5>
          <span
            className="material-icons-outlined close"
            onClick={() => setShowModal(false)}
          >
            close
          </span>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="banner-file" className="form-label">
            Banner Image
          </label>
          <input
            className="form-control"
            type="file"
            id="banner-file"
            accept="image/*"
            ref={uploadRef}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="mb-3">
          <Input
            placeholder="Enter blog title"
            label="Blog Title"
            name="title"
            value={data.title}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Body</label>
          <ReactQuill
            id="body"
            name="body"
            defaultValue={data.body}
            placeholder="Blog body goes here"
            onChange={(value) => setData({ ...data, body: value })}
          />
        </div>

        <ChipsInput
          label="Tags"
          list={list}
          onChipDelete={onChipDelete}
          onChange={onAddChip}
          placeholder="Add tags here"
          description="Press enter to add new"
          chipRef={chipRef}
        />
        <div className="d-flex align-items-center mt-3">
          <button className="btn btn-sm btn-primary me-3">Add blog</button>
          <button className="btn btn-sm btn-danger">Clear</button>
        </div>
      </div>
    </form>
  );
};
