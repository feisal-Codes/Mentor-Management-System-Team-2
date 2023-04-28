import { useEffect, useState } from "react";
import { Input, Row, Col } from "antd";
import { CustomInput, Label } from "../components/formInputs/CustomInput";
import { Icon } from "../components/Icon/Icon";
import { CustomFormModal } from "../components/CustomModal";
import SuccessMessage from "components/SuccessMessage";
import { PostCard } from "components/Cards";
import styles from "../styles/admin/discussionForum.module.css";
import { Avatar, Button, List, Skeleton } from "antd";
import axios from "axios";

function DiscussionForum() {
  const [newTopic, setNewTopic] = useState(false);
  const [formData, setFormData] = useState({});
  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const [token, setToken] = useState("");
  var count = 1;
  let limit = 2;
  console.log(token);
  let getPostsUrl;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setToken(JSON.parse(localStorage.getItem("token")));
    }
  }, []);

  useEffect(() => {
    getPostsUrl = `http://127.0.0.1:3333/api/v1/post?page=${5}&limit=${limit}`;

    fetch(getPostsUrl, {
      headers: {
        Authorization:
          "Bearer Nw.rySg978zvoMJp_SJG_MikcRbRoR0031PyJlE_2lt4zUzdyphYJ_CEgOBPwhn",
      },
    })
      .then((res) => res.json())

      .then((res) => {
        setInitLoading(false);
        setData(res.posts.data);
        setList(res.posts.data);
      });
  }, []);

  console.log(list);
  const onLoadMore = () => {
    setLoading(true);
    count = count + 1;
    console.log(count, "countttttttttttttt");
    getPostsUrl = `http://127.0.0.1:3333/api/v1/post?page=${count}`;
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          title: "",
          description: "",
        })),
      ),
    ),
    fetch(getPostsUrl, {
      headers: {
        Authorization:
          "Bearer Nw.rySg978zvoMJp_SJG_MikcRbRoR0031PyJlE_2lt4zUzdyphYJ_CEgOBPwhn",
      },
    })
      .then((res) => res.json())

      .then((res) => {
        console.log("we are here");
        console.log(res);
        let newData = res.posts.data;
        setData((prevState) => [...prevState, newData]);
        setList((prevState) => [...prevState, newData]);
        setLoading(false);
      });
    // fetch(getPostsUrl, {
    //   headers: {
    //     Authorization:
    //       "Bearer Nw.rySg978zvoMJp_SJG_MikcRbRoR0031PyJlE_2lt4zUzdyphYJ_CEgOBPwhn",
    //   },
    // })
    //   .then((res) => {
    //     res.json();
    //   })

    //   .then((res) => {
    //     console.log("we are here");
    //     console.log(res);
    //     setData((prevState, res) => {
    //       [...prevState, res.posts.data];
    //     });
    //     setList((prevState) => {
    //       [...prevState, res.posts.data];
    //     });
    //     console.log(list);
    //     console.log(data);
    //     setLoading(false);

    // window.dispatchEvent(new Event("resize"));
    // });
  };

  const handleClick = (e) => {
    e.preventDefault();
    setNewTopic(true);
  };

  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}>
        <Button onClick={onLoadMore}>load more</Button>
      </div>
    ) : null;

  return (
    <>
      <Row span={24} className={styles.container}>
        <Label title="Discussion Forum" weight="bold" />
        <Row className={styles.mb} onClick={handleClick}>
          <CustomInput
            placeholder="Add new topic"
            suffix={<Icon name="PlusIcon" />}
          />
        </Row>
        {/* <Row>
          {posts.length > 0 && 
            posts.map((post, index) => {
              return (
                <Row style={{ width: "100%" }} key={index}>
                  <PostCard data={post} />
                </Row>
              );
            })}
        </Row> */}
        <List
          className="demo-loadmore-list"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <Skeleton avatar title={false} loading={item.loading} active>
              <PostCard data={list} />
            </Skeleton>
          )}
        />
      </Row>

      {newTopic && (
        <CustomFormModal
          formData={formData}
          setFormData={setFormData}
          newTopic={newTopic}
          setNewTopic={setNewTopic}
          setPosts={setPosts}
          posts={posts}
          setSuccess={setSuccess}
        />
      )}
      {success && (
        <SuccessMessage
          image={"/assets/images/success.png"}
          message={"Post Created Successfully"}
          width={"220px"}
          height={"165px"}
          isModalOpen={success}
          setIsModalOpen={setSuccess}
        />
      )}
    </>
  );
}

export default DiscussionForum;
