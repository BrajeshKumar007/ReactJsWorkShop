import { useState, useEffect, ReactElement } from "react";
import styles from "./index.module.css";
import service from "utils/service";
import CONSTANTS from "utils/constants";
import { useInfiniteQuery } from "react-query";
import MovieCard, { MovieCardProps } from "components/MovieCard";
import Skeleton from "components/MovieCard/Skeleton";
import { Grid } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroll-component";

const Home = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState(0);
  const fetchMovies = ({ pageParam = 1 }) =>
  service.get(CONSTANTS.BASE_URL,`data/page${pageParam}.json`);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isLoading,
    refetch,
    remove,
  } = useInfiniteQuery(`movies`, fetchMovies, {
    getNextPageParam: (lastPage, pages) => {      
      return +lastPage.totalContent > currentPage * 20 ? currentPage + 1 : null;
    },
    onSuccess: () => {
      setCurrentPage(currentPage + 1);
    },
  });

  const allItems = data?.pages.flatMap((page) => page.contentItems) || [];
    const MoviesLoader = (itemCount: number): ReactElement => {
    return (
      <Grid container spacing={2}>
        {[...new Array(itemCount)].map((_, i: number) => (
          <Grid item xs={12} md={3} sm={4} lg={12} xl={12} key={i}>
            <Skeleton />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <div className={styles.root}>
      <Grid container justify="center">
        <Grid item xs={12} sm={10}>
          <Grid item xs={12} className={styles.movieListContainer}>
            {/* Loading state */}
            {isLoading && MoviesLoader(8)}

            {/* Success state */}
            {isSuccess &&
              (!!data ? (
                <InfiniteScroll
                  dataLength={
                    allItems.length
                  }
                  next={fetchNextPage}
                  hasMore={hasNextPage || false}
                  loader={MoviesLoader(4)}
                  style={{ overflow: "hidden" }}
                >
                  <Grid container spacing={2}>
                    {allItems.map(({
                          name,
                          Poster,
                        }: MovieCardProps) => (
                          <Grid item xs={4} md={3} sm={4} xl={6} lg={3}>
                            <MovieCard
                             {...{ name, Poster }}
                            />
                          </Grid>
                        )
                      )}
                  </Grid>
                </InfiniteScroll>
              ) : (
                "No Result"
              ))}

            {/* Error state */}
            {!!error && (
              <div className={styles.errorMessageContainer}>
                {JSON.stringify(error)}
              </div>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
