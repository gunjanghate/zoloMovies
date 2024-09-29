"use client";
// import React, { useState } from 'react';
// import Header from '@/app/components/Header';
// import Link from 'next/link';

// const Add = () => {
//   const [name, setName] = useState('');
//   const [genre, setGenre] = useState('');
//   const [year, setYear] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [donemsg, setDonemsg] = useState(""); 
//   const [alertMsg, setAlertMsg] = useState("");
//   const [filled, setfilled] = useState(false)

//   const handleSubmit = async (e) => {
//     if(name && genre && year && imageUrl){


//         e.preventDefault();
        
//         const movieData = {
//             name,
//             genre,
//             year: parseInt(year, 10), // Convert year to number
//       imageUrl,
//     };

//     try {
//       const response = await fetch('/api/movies', { // Adjust the endpoint as necessary
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(movieData),
//       });
//       setDonemsg("Movie Added SuccessFully!");
//       setTimeout(() => {
//         setDonemsg(""); // Reset alert message after 5 seconds
//     }, 5000);

//       const result = await response.json();
      
//       if (result.ok) {
//           console.log('Movie added successfully:', result);
          
//         // Optionally, handle success (like showing a message to the user)
//     } else {
//         console.error('Error adding movie:', result.error);
//       }
//     } catch (error) {
//         console.error('Network error:', error);
//     }
    
//     // Reset the form fields
//     setName('');
//     setGenre('');
//     setYear('');
//     setImageUrl('');
//     setfilled(true);
// }else{
//     setAlertMsg("Please Fill All Fields");
// }
// };
// return (
//     <>
//       <div className="header">
//         <Header />
//       </div>
//       {donemsg && (
//         <div className="bg-green-500 text-white text-center font-sans rounded-md shadow-sm shadow-green-300 font-bold w-fit px-2 py-2 ml-4 fixed transition-all translate-y-4  duration-300 ease-in-out opacity-100">
//           {donemsg}
//         </div>
//       )}
//         {alertMsg && (
//         <div className="bg-red-500 text-white text-center font-sans rounded-md shadow-md shadow-red-200 font-bold w-fit px-2 py-2 ml-4 fixed transition-all translate-y-4  duration-300 ease-in-out opacity-100">
//           {alertMsg}
//         </div>
//       )}
//       <div className="add-page flex flex-col items-center justify-center min-h-screen">
//         <form
//           onSubmit={handleSubmit}
//           className="add-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
//         >
//           <h2 className="text-2xl font-bold mb-4 text-red-500 text-center ">Add Movie</h2>

//           <div className="mb-4">
//             <label className="block text-yellow-400 text-sm font-bold mb-2" htmlFor="name">
//               Name
//             </label>
//             <input
//               id="name"
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Movie Name"
            //   required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-yellow-400 text-sm font-bold mb-2" htmlFor="genre">
//               Genre
//             </label>
//             <input
//               id="genre"
//               type="text"
//               value={genre}
//               onChange={(e) => setGenre(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Movie Genre"
            //   required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-yellow-400 text-sm font-bold mb-2" htmlFor="year">
//               Year of Release
//             </label>
//             <input
//               id="year"
//               type="number"
//               value={year}
//               onChange={(e) => setYear(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Year of Release"
            //   required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-yellow-400 text-sm font-bold mb-2" htmlFor="imageUrl">
//               Image URL
//             </label>
//             <input
//               id="imageUrl"
//               type="url"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
//               placeholder="Image URL"
            //   required
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <button
//               type="submit"
//               className="bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded hover:shadow-sm text-black hover:text-white hover:shadow-yellow-400 transition-colors focus:outline-none focus:shadow-outline"
//             >
//                 <Link href="/pages/movies">
//               Add Movie
//                 </Link>
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Add;
"use client";
import React, { useState } from 'react';
import Header from '@/app/components/Header';
import { useRouter } from 'next/navigation';

const Add = () => {
  const [name, setName] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [donemsg, setDonemsg] = useState(""); 
  const [alertMsg, setAlertMsg] = useState("");
  const [filled, setfilled] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && genre && year && imageUrl) {
        setAlertMsg("");
      const movieData = {
        name,
        genre,
        year: parseInt(year, 10),
        imageUrl,
      };

      try {
        const response = await fetch('/api/movies', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(movieData),
        });

        const result = await response.json();

        if (result.ok) {
          setDonemsg("Movie Added Successfully!");
          setTimeout(() => {
              router.push('/pages/movies'); 
            setDonemsg("");
          }, 3000);
   
        } else {
          setAlertMsg(result.error || "Error adding movie");
          console.error('Error adding movie:', result.error);
        }
      } catch (error) {
        setAlertMsg('Network error');
        console.error('Network error:', error);
      }

      // Reset the form fields
      setName('');
      setGenre('');
      setYear('');
      setImageUrl('');
      setfilled(true);
    } else {
      setAlertMsg("Please Fill All Fields!");
    }
  };

  return (
    <>
      <div className="header">
        <Header />
      </div>
      {donemsg && (
        <div className="bg-green-500 text-white text-center font-sans rounded-md shadow-sm shadow-green-300 font-bold w-fit px-2 py-2 ml-4 fixed transition-all translate-y-4 duration-300 ease-in-out opacity-100">
          {donemsg}
        </div>
      )}
      {alertMsg && (
        <div className="bg-red-500 text-white text-center font-sans rounded-md shadow-sm shadow-red-400 font-bold w-fit px-2 py-2 ml-4 fixed transition-all translate-y-4 duration-300 ease-in-out opacity-100">
          {alertMsg}
        </div>
      )}
      <div className="add-page flex flex-col items-center justify-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          className="add-form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-12 w-96"
        >
          <h2 className="text-2xl font-bold mb-4 text-red-500 text-center">Add Movie</h2>

          <div className="mb-4">
            <label className="block text-yellow-400 text-lg font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Movie Name"
            //   required
            />
          </div>

          <div className="mb-4">
            <label className="block text-yellow-400 text-lg font-bold mb-2" htmlFor="genre">
              Genre
            </label>
            <input
              id="genre"
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Movie Genre"
            //   required
            />
          </div>

          <div className="mb-4">
            <label className="block text-yellow-400 text-lg font-bold mb-2" htmlFor="year">
              Year of Release
            </label>
            <input
              id="year"
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Year of Release"
            //   required
            />
          </div>

          <div className="mb-4">
            <label className="block text-yellow-400 text-lg font-bold mb-2" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Image URL"
            //   required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 font-bold py-2 px-4 rounded hover:shadow-sm text-black hover:text-white hover:shadow-yellow-400 transition-colors focus:outline-none focus:shadow-outline"
            >
              Add Movie
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
