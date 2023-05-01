import { Avatar, Card, Space, Col, Row } from "antd";
import cardStyle from "../styles/admin/about.module.css";
import Icon from "./Icon";
import { Icon as Iconn } from "./Icon/Icon";
import styles from "./componentStyles/customCard.module.css";
import { useRouter } from "next/router";

export const PostCard = ({ data, fullPost }) => {
  console.log(data);
  const router = useRouter();
  const handleClick = (e, id) => {
    e.preventDefault();
    console.log(id);
    router.push("/discussion-forum/" + id);
  };

  return (
    <Row
      className={styles.container_width}
      sm={24}
      onClick={(e) => {
        handleClick(e, data?.id);
      }}>
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
              <p className={styles.title}>{data?.user?.first_name}</p>
              <p className={styles.role}>{data?.user?.role || "Role"}</p>
            </div>
          </div>

          <Iconn name="Horizon" />
        </Row>
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
        <Row className={styles.icons_container}>
          <Col className={styles.icons} sm={3}>
            <Iconn name="Comment" />
            <Iconn name="Share" />
            <Iconn name="BookMark" />
          </Col>
          <Col sm={21} className={styles.clock_icon}>
            <Iconn name="Clock" />
          </Col>
        </Row>
      </Card>
    </Row>
  );
};
