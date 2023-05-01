import React, { useEffect, useState } from "react";
import axios from "axios";

function usePostFetch(url, page, token) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(page);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    axios
      .get(url + "?page=" + page, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setData((prevData) => {
          return [...prevData, ...res.data?.posts?.data];
        });
        setError(false);
        setLoading(false);
        setPageNumber(res.data?.posts?.meta?.current_page);
        if (!res.data.posts?.meta?.next_page_url) {
          setHasMore(false);
        }
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, [url, page]);

  return { data, error, loading, hasMore, pageNumber };
}

export default usePostFetch;
