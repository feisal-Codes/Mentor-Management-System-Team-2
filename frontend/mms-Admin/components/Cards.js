import { Avatar, Card, Space, Col, Row } from "antd";
import cardStyle from "../styles/admin/about.module.scss";
import Icon from "./Icon";
import { Icon as Iconn } from "./Icon/Icon";
import styles from "./componentStyles/customCard.module.css";
import { useRouter } from "next/router";
import getUserRole from "../utils/getUserRole.js";
import Link from "next/link";

export const PostCard = ({ data, fullPost, names }) => {
  console.log("from coments");
  console.log(data);

  const router = useRouter();

  const handleCommentsClick = (e, id, name) => {
    e.preventDefault();
    router.push({
      pathname: "/discussion-forum/[id]",
      query: {
        id: data.id,
        first_name: data?.user?.first_name,
        last_name: data?.user?.last_name,
      },
    });
  };
  return (
    <Row className={styles.container_width} sm={24}>
      <Card className={styles.card}>
        <Row span={24} className={styles.row_justify}>
          <div className={cardStyle.about_header}>
            <Avatar
              size={45}
              icon={
                <Icon
                  icon={"/assets/images/admin_avatar.png"}
                  width={"45px"}
                  height={"45px"}
                />
              }
            />
            <div style={{ marginLeft: "18px" }} className={styles.profile}>
              <p className={styles.title}>
                {names
                  ? names
                  : data?.user?.first_name + " " + data?.user?.last_name}
              </p>
              <p className={styles.role}>{getUserRole(data?.user)}</p>
            </div>
          </div>

          <Iconn name="Horizon" />
        </Row>

        <Link
          href={{
            pathname: "/discussion-forum/[id]",
            query: {
              id: data.id,
              first_name: data?.user?.first_name,
              last_name: data?.user?.last_name,
            },
          }}>
          <div>
            <div className={styles.row_mt}>
              <p className={styles.data_title}>{data?.title?.toUpperCase()}</p>
            </div>
            <Row>
              {fullPost ? (
                <div className={styles.data_post}>
                  <p>{data?.description}</p>
                </div>
              ) : (
                <div className={styles.data_post}>
                  <p>
                    {data?.description.slice(0, 500)}

                    {data?.description?.length > 500 ? "  ....." : ""}
                  </p>
                </div>
              )}
            </Row>
          </div>
        </Link>
        <Row className={styles.icons_container}>
          <Col className={styles.icons} sm={3}>
            <div onClick={handleCommentsClick}>
              <Iconn name="Comment" />
            </div>
            <div>
              <Iconn name="Share" />
            </div>
            <div>
              <Iconn name="BookMark" />
            </div>
          </Col>
          <Col sm={21} className={styles.clock_icon}>
            <div>
              <Iconn name="Clock" />
            </div>
          </Col>
        </Row>
      </Card>
    </Row>
  );
};

export const CommentCard = ({ data }) => {
  return (
    <Row className={styles.container_width} sm={24}>
      <Card className={[styles.card, styles.commentCard]}>
        <Row span={24} className={styles.row_justify}>
          <p className={styles.title}>
            {data?.user?.first_name + " " + data?.user?.last_name}
          </p>

          <Iconn name="Horizon" />
        </Row>
        <Row>
          <div className={styles.data_post}>
            <p>{data?.comment}</p>
          </div>
        </Row>
      </Card>
    </Row>
  );
};
