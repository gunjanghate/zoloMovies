"use client";
import React, { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import { FaSpinner } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";

const Page = () => {
  const [stockData, setStockData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState("");
  const [updated, setUpdated] = useState("");
  // const [editMode, setEditMode] = useState(false);
  // const [editStock, setEditStock] = useState({});

  // Fetch stock data from the server
  const fetchStockData = async () => {
    try {
      const response = await fetch("/api/movies");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (data.success) {
        setStockData(data.products);
      } else {
        console.error("Failed to fetch stock data");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handling search and genre filtering
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  const filteredStockData = stockData
    .filter((stock) =>
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((stock) => selectedGenre === "All" || stock.genre === selectedGenre);

  // Handling deletion
  const handleDelete = async (id) => {
    console.log("Deleting stock with ID:", id);
    try {
      const response = await fetch('/api/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      setDeleted("Movie deleted successfully!");
      setTimeout(() => setDeleted(""), 3000);

      setStockData(stockData.filter((stock) => stock._id !== id));
    } catch (error) {
      console.error("Error deleting stock:", error.message);
    }
  };

  // Enable edit mode for the selected movie
  // const handleEdit = (stock) => {
  //   setEditMode(true);
  //   setEditStock(stock);
  // };

  // Handling updates
  // const handleEditChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditStock({ ...editStock, [name]: value });
  // };

  // const handleUpdate = async () => {
  //   if (!editStock._id || !editStock.name || !editStock.genre || !editStock.year) {
  //     console.error("Missing fields for update");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`/api/update`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(editStock),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to update product");
  //     }

  //     const { movie } = await response.json();
  //     setUpdated("Movie updated successfully!");
  //     setTimeout(() => {
  //       setUpdated("");
  //       setEditMode(false);
  //     }, 3000);

  //     const updatedData = stockData.map((stock) =>
  //       stock._id === movie._id ? movie : stock
  //     );
  //     setStockData(updatedData);
  //   } catch (error) {
  //     console.error("Error updating stock:", error.message);
  //   }
  // };

  useEffect(() => {
    fetchStockData();
  }, []);

  if (loading) {
    return (
      <div className="text-center font-bold font-sans mt-10 flex justify-center">
        <FaSpinner className="animate-spin mr-2" /> Loading...
      </div>
    );
  }

  const genres = ["All", ...new Set(stockData.map((stock) => stock.genre))];

  return (
    <div>
      <Header />
      {updated && (
        <div className="bg-green-500 text-white text-center font-sans rounded-md shadow-sm shadow-green-300 font-bold w-fit px-2 py-2 ml-4 fixed transition-all translate-y-4 duration-300 ease-in-out opacity-100">
          {updated}
        </div>
      )}
      {deleted && (
        <div className="bg-red-500 text-white text-center font-sans rounded-md shadow-sm shadow-red-400 font-bold w-fit px-2 py-2 ml-4 fixed transition-all translate-y-4 duration-300 ease-in-out opacity-100">
          {deleted}
        </div>
      )}

      <div className="movies-main min-h-screen flex flex-col justify-around gap-12 items-center py-5">
        <div className="movies-main-up w-3/4 flex flex-col justify-center items-center">
          <div className="heading text-4xl font-bold">Top Trending Movies</div>
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="mt-5 p-2 border text-black rounded w-1/2 shadow-md shadow-slate-700"
          />
          <select
            value={selectedGenre}
            onChange={handleGenreChange}
            className="mt-2 text-center h-5 text-sm w-24 border text-black rounded shadow-md shadow-slate-700"
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* {editMode && (
          <div className="movie-item transition-all flex flex-col justify-center items-center text-white edit-form w-1/2 bg-gray-200 p-4 rounded-md">
            <h2 className="text-2xl font-bold">Edit Movie Data</h2>
            <input
              type="text"
              name="name"
              value={editStock.name}
              onChange={handleEditChange}
              className="border p-2 rounded mb-2 w-full text-black"
              placeholder="Movie Name"
            />
            <input
              type="text"
              name="genre"
              value={editStock.genre}
              onChange={handleEditChange}
              className="border p-2 rounded mb-2 w-full text-black"
              placeholder="Genre"
            />
            <input
              type="number"
              name="year"
              value={editStock.year}
              onChange={handleEditChange}
              className="border p-2 rounded mb-2 w-full text-black"
              placeholder="Release Year"
            />
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white p-2 rounded"
            >
              Update Movie
            </button>
          </div>
        )} */}

        <div className="movies-list flex flex-col gap-6 md:flex-row md:flex-wrap lg:flex-row md:mx-32 lg:mx-24 mt-5">
          {filteredStockData.length > 0 ? (
            filteredStockData.map((stock) => (
              <div key={stock._id} className="list-content flex gap-2">
                <div className="movie-item flex flex-col gap-2 justify-center items-center h-96 p-3 border-x-2 border-y-2 border-red-950 rounded-md shadow-md shadow-red-400">
                  <div className="movie-img overflow-hidden">
                    <img
                      src={stock.imageUrl}
                      alt={stock.name}
                      className="w-64 mt-2 mb-2"
                    />
                  </div>
                  <div className="movie-info bg-slate-800 py-2 px-16 rounded-md shadow-md shadow-black font-semibold">
                    <h3 className="text-xl text-white font-bold">{stock.name}</h3>
                    <p className="text-gray-500">{stock.genre}</p>
                    <p className="text-slate-500">Released: {stock.year}</p>
                  </div>
                </div>
                <div className="update-delete flex flex-col gap-2">
                  {/* <button
                    onClick={() => handleEdit(stock)}
                    className="update text-blue-500 text-2xl ml-1"
                  >
                    <FiEdit />
                  </button> */}
                  <button
                    onClick={() => handleDelete(stock._id)}
                    className="delete text-red-500 text-2xl"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <>
            <div className="text-center text-2xl">No matching movies found.</div>
            {/* <span className="text-2xl text-yellow-500"><Link href="/pages/add">Add Movie</Link></span> */}
            </>
          )}
        </div>
      <span className="text-2xl text-yellow-400"><Link href="/pages/add">Add Movie{" "} →</Link></span>
      </div>
    </div>
  );
};

export default Page;
