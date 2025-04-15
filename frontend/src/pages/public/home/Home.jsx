import { Link } from "react-router-dom";
import css from "./styles/style.module.css";

export default function Home() {
  return (
    <>
      <div className={css.hero}>
        <div className={css.heroContent}>
          <div className={css.container}>
            <h1 className={css.heading}>Hello there !</h1>
            <p className={css.subtext}>Welcome to Bold</p>
            <Link to="/auth" className={css.button}>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
