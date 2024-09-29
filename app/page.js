import Image from "next/image";
import Header from "./components/Header";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <Header />
      <div className="landing-page text-white h-screen flex flex-col items-center justify-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-serif mb-8 text-center">
          Welcome to <span className="text-yellow-500">zoloMovies</span>
        </h1>
        <p className="text-lg md:text-2xl text-center mb-10">
          Your go-to place for finding the best movies.
        </p>
        <Link href="/pages/movies">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black  text-lg font-extrabold py-3 px-6 rounded-lg shadow-sm shadow-blue-400">
            Get Started
          </button>
        </Link>
      </div>
    </>
  );
}
