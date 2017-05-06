// @flow
import React from "react";
import unescape from "lodash/unescape";
import Link from "next/link";
import { gql, graphql } from "react-apollo";
import type { RankingT } from "../types";

const MOVIES_PER_PAGE = 32;

type Props = {
  data: {
    allRankings: RankingT[],
    loading: boolean,
    _allRankingsMeta: {
      count: number
    }
  },
  loadMoreMovies: () => void
};

function MovieList({
  data: { allRankings, loading, _allRankingsMeta },
  loadMoreMovies
}: Props) {
  if (allRankings && allRankings.length) {
    const areMoreMovies = allRankings.length < _allRankingsMeta.count;
    return (
      <section>
        {allRankings.map(({ movie }, index) => (
          <Link
            key={movie.id}
            href={`/movie?id=${movie.id}`}
            as={`/movie/${movie.id}`}
          >
            <a>
              <div
                className="poster"
                title={unescape(movie.title)}
                style={{
                  background: movie.poster
                    ? `url('https://image.tmdb.org/t/p/w185${movie.poster}')`
                    : "black"
                }}
              />
              <span className="position">{index + 1}</span>
            </a>
          </Link>
        ))}
        {areMoreMovies
          ? <button onClick={() => loadMoreMovies()}>
              {loading ? "Loading..." : "Load More"}
            </button>
          : ""}
        <style jsx>{`
          section {
            display: flex;
            flex: 0 0 33%;
            flex-wrap: wrap;
            overflow-y: scroll;
          }

          a {
            overflow: hidden;
            position: relative;
            text-decoration: none;
            transition: color .15s ease-in;
            width: 25%;
          }

          a:link,
          a:visited {
            transition: color .15s ease-in;
          }

          a:hover   {
            transition: color .15s ease-in;
          }

          a:active  {
            transition: color .15s ease-in;
          }

          a:focus   {
            transition: color .15s ease-in;
            outline: 1px dotted currentColor;
          }

          button {
            appearance: none;
            background: #111;
            border: 0;
            color: #f4f4f4;
            font-family: 'Courier Next', courier, monospace;
            font-size: 1rem;
            padding: 1em;
            transition: background 0.2s;
            width: 100%;
          }

          button:hover {
            cursor: pointer;
            background: #222;
          }

          .position {
            background-color: rgba( 255, 255, 255, .9 );
            color: #000;
            height: 1rem;
            left: 0;
            position: absolute;
            text-align: center;
            top: 0;
            width: 2rem;
          }

          .poster {
            -moz-osx-font-smoothing: grayscale;
            backface-visibility: hidden;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover !important;
            padding-bottom: 150%;
            transform: translateZ(0);
            transition: transform 0.25s ease-out;
          }

          .poster:hover,
          .poster:focus {
            transform: scale(1.05);
          }

          .poster:active {
            transform: scale(.90);
          }
        `}</style>
      </section>
    );
  }
  return <div>Loading</div>;
}

const allRankings = gql`
  query allRankings($first: Int!, $skip: Int!) {
    allRankings(
      orderBy: position_DESC,
      first: $first,
      skip: $skip
    ) {
      movie {
        id
        poster
        title
      }
    },
    _allRankingsMeta {
      count
    }
  }
`;

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component (MovieList)
export default graphql(allRankings, {
  options: {
    variables: {
      skip: 0,
      first: MOVIES_PER_PAGE
    }
  },
  props: ({ data }) => ({
    data,
    loadMoreMovies: () => {
      return data.fetchMore({
        variables: {
          skip: data.allRankings.length
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult;
          }
          return {
            ...previousResult,
            allRankings: [
              ...previousResult.allRankings,
              ...fetchMoreResult.allRankings
            ]
          };
        }
      });
    }
  })
})(MovieList);
