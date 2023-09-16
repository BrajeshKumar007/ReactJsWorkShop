import styles from "./index.module.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
export type MovieCardProps = {
  name: string;
  Poster: string;
};
const MovieCard =({ name,Poster }: MovieCardProps) => {
  let imgUrl="https://test.create.diagnal.com/images/"+Poster
  return (
    <Card className={styles.root}>
      <CardActionArea className={styles.cardArea}>
        <CardMedia
          component="img"
          alt={name}
          height="400"
          image={imgUrl}
          title={name}
          className={styles.poster}
        />
        <CardContent className={styles.overText}>
            <p>{name}</p>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
