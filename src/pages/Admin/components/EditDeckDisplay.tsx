import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./DeckDisplay.css";
import { BButton } from "../../../components/BButton";

type EditDeckForm = {
  _id: string;
  name: string;
  description: string;
};

type Props = {
  deck: EditDeckForm;
  editCB: Function;
  deleteCB: Function;
};

export const EditDeckDisplay = ({ deck, editCB, deleteCB }: Props) => {
  const { register, handleSubmit, setValue } = useForm<EditDeckForm>({
    mode: "onBlur",
  });

  const edit = handleSubmit((data: EditDeckForm) => {
    data._id = deck._id;
    editCB(data);
  });

  useEffect(() => {
    setValue("name", deck.name);
    setValue("description", deck.description);
  }, [deck, setValue]);

  return (
    <div className="flexbox-parent-middle-top flex-column">
      <label htmlFor="name">Name of the Questionnaire</label>

      <input
        ref={register({ required: true, minLength: 5 })}
        type="text"
        id="name"
        name="name"
        style={{ width: "350px" }}
      />

      <label htmlFor="description">Short Description</label>

      <textarea
        id="description"
        name="description"
        placeholder="Minimum 15 characters"
        ref={register({ required: true, minLength: 15 })}
        style={{ width: "350px", height: "100px" }}
      />

      <BButton text="Edit Deck" onClick={edit} />

      <BButton text="Delete Deck" onClick={() => deleteCB(deck._id)} />
    </div>
  );
};
