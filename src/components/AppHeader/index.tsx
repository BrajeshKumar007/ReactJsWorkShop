import styles from "./index.module.css";
import IconButton from "@material-ui/core/IconButton";
import ArrowBack from "@material-ui/icons/ArrowBack";
import SearchIcon from "@material-ui/icons/Search";

const AppHeader = (): React.ReactElement => {
  return (
    <>
    <div className={styles.root}>
      <IconButton
        aria-label="back"
        className={styles.backBtn}
      >
        <ArrowBack/>
      </IconButton>
      <p className={styles.headerName}>Romantic Comedy</p>
      <IconButton aria-label="search" className={styles.searchBtn} >
          <SearchIcon />
        </IconButton>
    </div>
 
    </>
  );
};

export default AppHeader;
