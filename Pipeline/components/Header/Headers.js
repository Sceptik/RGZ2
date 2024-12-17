import { useRouter } from "next/navigation";
import styles from "../../src/styles/Header/Header.module.css";
export const Headers = (props) => {
  const router = useRouter();

  const handleNavigation = () => {
    if(localStorage.getItem('isAuth') === 'true')
    router.push("/dashBoard/");
  };

  const handelExit = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuth', 'false');
      localStorage.setItem('isAdmin', 'null');
    }

    router.push('/Login/')
  }

  return (
    <header className={styles.header}>
      <div className={styles.header__column}>
      </div>
      <div className={styles.header__column}>
        {props.exit ? <button className={styles.sign__btn} onClick={handelExit}>exit</button> : <button style={{background:"cyan"}} className={styles.sign__btn} onClick={handelExit}>Авторизация</button>}
      </div>
    </header>
  );
};
