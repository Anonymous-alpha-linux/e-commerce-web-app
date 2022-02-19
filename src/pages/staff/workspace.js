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
  return (
    <>
      <TagsInput filter={arrTest}></TagsInput>
      <Timespan></Timespan>
      <PostForm></PostForm>
      <PostContainer></PostContainer>
    </>
  );
}
