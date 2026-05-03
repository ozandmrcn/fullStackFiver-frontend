import type { FC, FormEvent } from "react";
import { categories, inputs } from "../../utils/constants";
import Input from "../../components/form/input";
import Select from "../../components/form/select";
import { useCreateGig } from "../../service/gig";
import Loader from "../../components/loader";

const AddGig: FC = () => {
  const { mutate, isPending } = useCreateGig();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const description = (form.get("description") as string) || "";

    // 🔥 validation
    if (description.trim().length < 15) {
      alert("Description en az 15 karakter olmalı");
      return;
    }

    const gigData = new FormData();

    gigData.append("title", (form.get("title") as string) || "");
    gigData.append("description", description);
    gigData.append("category", (form.get("category") as string) || "");
    gigData.append("packagePrice", (form.get("packagePrice") as string) || "");
    gigData.append(
      "packageFeatures",
      (form.get("packageFeatures") as string) || "",
    );

    gigData.append("packageDuration", "3");
    gigData.append("packageRevisions", "2");

    const coverImage = form.get("coverImage");
    const images = form.getAll("images");

    if (coverImage) gigData.append("coverImage", coverImage);

    images.forEach((img) => {
      if (img) gigData.append("images", img);
    });

    mutate(gigData);
  };

  return (
    <div>
      <h1 className="font-bold text-3xl mb-5 text-gray-600">
        Yeni Hizmet Oluştur
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-x-10">
          {inputs.map((input, key) => (
            <Input {...input} key={key} />
          ))}

          <Select label="Kategori" options={categories} name="category" />
        </div>

        <div className="flex md:justify-center my-5">
          <button
            className="bg-green-500 px-6 py-2 rounded-md text-white hover:bg-green-600 max-md:w-full w-1/2 flex justify-center disabled:opacity-80 cursor-pointer h-9"
            disabled={isPending}
          >
            {isPending ? <Loader designs="text-lg text-white" /> : "Oluştur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGig;
