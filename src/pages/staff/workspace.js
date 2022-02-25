import React, { useEffect, useState } from "react";
import { ContainerComponent } from "../../components";
import { PostContainer, PostForm, Timespan, TagsInput } from "../../containers";

let arrTest = [
  "dog",
  "cat",
  "bird",
  "fish",
  "beaver",
  "otter",
  "rabbit",
  "hamster",
];

export default function Workspace() {
  const [formField, setFormField] = useState([]);
  return (
    <>
      <TagsInput
        filter={arrTest}
        formField={formField}
        setFormField={setFormField}
      ></TagsInput>
      <Timespan></Timespan>
      <PostForm></PostForm>
      <PostContainer></PostContainer>
    </>
  );
}
