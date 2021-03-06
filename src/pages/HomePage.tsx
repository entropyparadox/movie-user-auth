import React, { useEffect, useState } from "react";
import { CategoryButton } from "../components/CategoryButton";
import { MovieCard } from "../components/MovieCard";
import popularImg from "../assets/images/popcorn.png";
import nowPlayingImg from "../assets/images/seats.jpeg";
import axios from "axios";
import { replaceEqualDeep } from "react-query/types/core/utils";
import { useHistory } from "react-router-dom";

const API_KEY = "c275787762fb2904adb52c4ad6412662";

export type Category = {
  id: number;
  label: string;
  url: string;
  image: string;
};

const CATEGORY_LIST = [
  { id: 0, label: "인기영화", url: "/popular", image: popularImg },
  { id: 1, label: "현재 상영작", url: "/now_playing", image: nowPlayingImg },
];

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
};

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<any[]>([]);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const { replace } = useHistory();

  const setCategory = (index: number) => {
    setCategoryIndex(index);
  };

  const getData = async (categoryIndex: number) => {
    axios
      .get("http://localhost:1337/api/movies?populate=%2A", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        // Handle success.
        console.log("Data: ", response.data);
        setMovies(response.data.data);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error.response);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      replace("/login");
    }
    getData(categoryIndex);
  }, [categoryIndex]);

  return (
    <div className="m-4 space-y-10">
      <div className="className=">
        <div className="space-y-4">
          <div className="text-2xl font-bold">New</div>
          <img
            src="https://source.unsplash.com/random"
            alt=""
            className="w-full h-72 object-cover rounded-2xl"
          />
        </div>
      </div>

      <div>
        <div className="space-y-4">
          <div className="text-2xl font-bold">Category</div>

          <div className="flex space-x-3">
            {CATEGORY_LIST.map((data) => (
              <CategoryButton
                key={data.id}
                category={data}
                onClick={setCategory}
                isSelected={data.id === categoryIndex}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <div>
    <div className="text-2xl font-bold mb-4">List</div>  
      <div className="border p-4 rounded-mb">
        <div>
          <img src="https://source.unsplash.com/random"
          alt=""
          className="w-full h-60 object-cover rounded-xl"
          />
          <div className="mt-4">
            <div className="text-lg font-semibold">Card title</div>
            <div className="text-gray-500">
              This is where your description locate.
            </div>
          <div className="mt-4 justify-end flex space-x-3">
            <div className="bg-gray-800 rounded-md text-white text-center py-2.5 px-4">만들기</div>
            <div className="bg-gray-800 rounded-md text-white text-center py-2.5 px-4">공유하기</div>
          </div>
          </div>
        </div>
      </div>
    </div>
<div>

</div> */}
      <div className="text-2xl font-bold mb-4">Today's Special</div>

      {!isLoading &&
        movies.map((movie: any) => <MovieCard key={movie.id} movie={movie} />)}

      <div className="flex space-x-3">
        <div>
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60"
            alt=""
            className="w-full h-30 object-cover rounded-xl"
          />
          <div className="mt-4">
            <div className="text-lg font-semibold">52번가 샐러드</div>
            <div className="text-sm text-gray-500">
              서울 서대문구 이화여대길 52-15
              <div className="text-sm text-gray-500">
                02-1234-5678
                <div className="text-sm text-gray-500">
                  Mon-SAT 9:00 AM - 9:00 PM
                </div>
                <div className="m-4">
                  <div className="bg-gray-800 rounded-md text-white text-center py-2.5 px-4">
                    네이버 지도로 길찾기
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
