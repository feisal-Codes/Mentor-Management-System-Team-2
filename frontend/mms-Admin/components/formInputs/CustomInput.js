import { Input, Button } from "antd";
import styles from "./form.module.css";
import clsx from "clsx";

export function CustomTextArea({ ...inputConfig }) {
  return <Input.TextArea className={styles.textarea} {...inputConfig} />;
}

export function CustomInput({ size, className, ...inputConfig }) {
  const classN = clsx(styles.input, { [styles.small]: size == "small" });

  return inputConfig.eyeIcon ? (
    <Input.Password className={classN} {...inputConfig} />
  ) : (
    <Input className={classN} {...inputConfig} />
  );
}

export function CustomButton({ children, ...props }) {
  return (
    <Button className={styles.button} {...props}>
      <span className={styles.btn_text}>{children}</span>
    </Button>
  );
}

export function Label({ title }) {
  return (
    <div className={styles.label}>
      <label>{title}</label>
    </div>
  );
}
