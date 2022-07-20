import "./styles.scss";

export default function TitleSubtitle({ title, subTitle }) {
  return (
    <div className="title_subtitle_box">
      <h2>{title}</h2>
      <h3>{subTitle}</h3>
    </div>
  );
}
