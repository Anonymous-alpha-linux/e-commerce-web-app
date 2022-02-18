import React, { useEffect, useState } from "react";
import axios from 'axios';
import { ContainerComponent } from "../../components";
import { PostContainer, PostForm, Timespan } from "../../containers";
import { mainAPI } from '../../config';
import { useAuthorizationContext } from "../../redux";
import { Loading } from "..";
import { unstable_batchedUpdates } from "react-dom";

export default function Workspace() {
  const API = mainAPI.LOCALHOST_STAFF;
  const { user, data, setData, cancelTokenSource } = useAuthorizationContext();
  const [caching, setCaching] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(API + '?view=workspace&page=0', {
      headers: {
        'Authorization': `Bearer ${user.accessToken}`
      },
      cancelToken: cancelTokenSource.token
    }).then(data => {
      unstable_batchedUpdates(() => {
        setData(data.data);
      })
    }).catch(error => console.log(error.message))
      .finally(() => setLoading(false));
    return () => {
      cancelTokenSource.cancel();
    }
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (loading) return <Loading></Loading>

  return (
    <div className="workspace">
      <Timespan></Timespan>
      <PostForm></PostForm>
      {
        data.account.map()
      }
      {/* <PostContainer></PostContainer> */}
    </div>
  );
}
