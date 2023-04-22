import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormField, Loader } from "../components";
import { preview } from "../assets";
import { getRandomPrompt } from "../utils";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [genratingImage, setGenratingImage] = useState(false);
  const generateIMage = async () => {
    if (form.prompt) {
      try {
        setGenratingImage(true);
        const response = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (error) {
        alert(error);
        // console.log(error)
      } finally {
        setGenratingImage(false);
      }
    } else {
      alert("Please enter a prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.prompt && form.prompt) {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/v1/post", {
          method: "POST",
          headers: {
            'Content-Type':"application/json",
          },
          body: JSON.stringify({ ...form }),
        });
        await response.json();
        alert("Success");
        navigate("/");
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please enter a prompt to genarte an Image");
    }
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSurpriseMe = () => {
    const randomprompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomprompt });
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create Imaginative and stunning images through DALL-E AI and share
          them with community
        </p>
      </div>

      {/* Form section */}
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            LabelName="YourName"
            type="text"
            name="name"
            placeholder="Danish"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="a painting of a fox in the style of Starry Night"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="realtive bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 h-64  p-3 flex justify-center items-center shadow-lg">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-9/12 h-9/12 object-contain"
              />
            ) : (
              <img
                src={preview}
                alt={form.prompt}
                className="w-9/12 h-9/12 object-cover"
              />
            )}

            {genratingImage && (
              <div className="absolute  flex  justify-center items-center w-64 h-64 rounded-lg bg-[rgba(0,0,0,0.5)]">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateIMage}
            className="text-white rounded-md w-full font-medium bg-green-700 sm:w-auto px-5 py-2 text-center "
          >
            {genratingImage ? "Genarating" : "Generate"}
          </button>
        </div>

        <div className="mt-6">
          <p className="mt-2 text-[14px] text-[#666e75]">
            Once you have created the image you want you can share it with
            community{" "}
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium px-4 py-2 w-full rounded-md text-sm text-center sm:w-auto"
          >
            {loading ? "Sharing..." : "Share with community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;