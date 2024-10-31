import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { addMovie } from "../redux/movieSlice";

const movieSchema = z.object({
  title: z.string().min(2, "The tile must have more than 2 letters"),
  rating: z
    .number()
    .min(1, "Rating must be between 1 and 10")
    .max(10, "Rating must be between 1 and 10"),
  genre: z.string().min(3, "Genre is required"),
});

type MovieFormData = z.infer<typeof movieSchema>;

const AddMovieForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const onSubmit = (data: MovieFormData) => {
    dispatch(addMovie({ ...data, id: Math.random() }));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <div className="mb-4">
        <input
          {...register("title")}
          placeholder="Title"
          className={`p-2 border rounded w-full ${
            errors.title ? "border-red-500" : "border-gray-300 "
          }`}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      </div>

      <div className="mb-4">
        <input
          {...register("rating", { valueAsNumber: true })}
          placeholder="Rating"
          type="input"
          className={`p-2 border rounded w-full ${
            errors.rating ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.rating && (
          <p className="text-red-500">{errors.rating.message}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          {...register("genre")}
          placeholder="Genre"
          className={`p-2 border rounded w-full ${
            errors.genre ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.genre && <p className="text-red-500">{errors.genre.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:scale-105"
      >
        Add Movie
      </button>
    </form>
  );
};

export default AddMovieForm;
