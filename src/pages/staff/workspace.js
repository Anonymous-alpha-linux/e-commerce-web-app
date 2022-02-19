import React, { useEffect, useState } from "react";
import { ContainerComponent } from "../../components";
import { PostContainer, PostForm, Timespan, TagInput } from "../../containers";

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
  return (
    <>
      <TagInput filter={arrTest}></TagInput>
      <Timespan></Timespan>
      <PostForm></PostForm>
      <PostContainer></PostContainer>
    </>
  );
}
