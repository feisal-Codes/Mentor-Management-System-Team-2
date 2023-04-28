import React, { useState, useEffect } from "react";
import { Table, Pagination } from "antd";
import axios from "axios";

const MyTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  let getPostsUrl = `http://127.0.0.1:3333/api/v1/post?page=${5}&limit=${10}`;

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(getPostsUrl, {
        headers: {
          Authorization:
            "Bearer Nw.rySg978zvoMJp_SJG_MikcRbRoR0031PyJlE_2lt4zUzdyphYJ_CEgOBPwhn",
        },
      });
      let res = await result.json();
      setData(res);

      setTotal(10);
    };

    fetchData();
  }, [page, pageSize]);

  const handlePageChange = (pageNumber, pageSize) => {
    setPage(pageNumber);
    setPageSize(pageSize);
  };

  const columns = [
    // define your columns here
    // example: { title: 'Name', dataIndex: 'name', key: 'name' },
  ];

  return (
    <>
      <Table dataSource={data} columns={columns} />
      <Pagination
        current={page}
        pageSize={pageSize}
        total={total}
        onChange={handlePageChange}
      />
    </>
  );
};

export default MyTable;
