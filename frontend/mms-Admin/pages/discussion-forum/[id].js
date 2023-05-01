import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import usePostFetch, { useSingleFetch } from "/utils/usePostFetch";
import { get_posts } from "/utils/urls";
import { PostCard } from "components/Cards";
import { Row } from "antd";
import axios from "axios";

function Post() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setToken(JSON.parse(localStorage.getItem("token")));
    }
    if (router.isReady && router.query.id) {
      let id = router.query.id;
      axios
        .get(get_posts + "/" + id, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setData(res.data.post);
          setError(false);
          setLoading(false);
        })
        .catch((e) => {
          setError(true);
          setLoading(false);
        });
    }
  }, [router.isReady]);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>something went wrong!</div>;
  }

  return (
    <>
      <Row style={{ width: "100%" }}>
        <PostCard data={data} fullPost />
      </Row>
    </>
  );
}

export default Post;
