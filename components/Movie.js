// @flow
import React from "react";
import unescape from "lodash/unescape";
import { gql, graphql } from "react-apollo";
import type { MovieT } from "../types";
import Rankings from "./Rankings";

function runtime(mins: number) {
  const hours = Math.floor(mins / 60);
  const newMins = mins % (hours * 60);
  return `${hours}hr${hours > 1 ? "s" : ""} ${newMins}min${newMins > 1 ? "s" : ""}`;
}

type Props = { data: { Movie: MovieT } };

function Movie({ data: { Movie } }: Props) {
  if (Movie) {
    return (
      <section
        style={{
          background: Movie.backdrop
            ? `url('https://image.tmdb.org/t/p/w1280${Movie.backdrop}')`
            : "#333"
        }}
      >
        <div className="wrapper">
          {Movie.poster &&
            <img
              src={`https://image.tmdb.org/t/p/w500${Movie.poster}`}
              alt={unescape(Movie.title)}
            />}
          <div className="description">
            <h1>
              {unescape(Movie.title)}
              {Movie.title !== Movie.originalTitle &&
                <small>({unescape(Movie.originalTitle)})</small>}
            </h1>
            <h3>
              {Movie.releaseDate.substr(0, 4)}
              {` / `}
              {runtime(Movie.runtime)}
            </h3>
            <Rankings rankings={Movie.ranking} />
            {Movie.tagline && <h5>{unescape(Movie.tagline)}</h5>}
            <p>{unescape(Movie.overview)}</p>
            <span className="tmdb">
              Film data from <a href="https://www.themoviedb.org/">TMDb</a>.
            </span>
          </div>
        </div>
        <style jsx>{`
          section {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover !important;
            display: flex;
            flex-grow: 1;
            width: calc(100% / 1.5);
          }

          h1 {
            font-size: 3rem;
            line-height: 1;
            margin-bottom: 0;
            text-transform: uppercase;
          }

          h3 {
            font-size: 1.5rem;
            line-height: 1.25;
            margin-top: 0;
          }

          h5 {
            font-size: 1rem;
            line-height: 1.25;
            margin-bottom: 0;
          }

          img {
            width: calc(100% / 3);
          }

          p {
            line-height: 1.5;
            max-width: 34em;
          }

          small {
            display: block;
            font-size: 2.25rem;
            line-height: 1;
            margin-bottom: .5rem;
          }

          .description {
            color: #fff;
            padding-left: 2rem;
            padding-right: 2rem;
            width: calc(100% / 1.5);
          }

          .tmdb {
            color: #ddd;
            font-size: 0.75rem;
            font-style: italic;
          }

          .tmdb a {
            color: #eee;
          }

          .wrapper {
            align-items: flex-end;
            background-color: rgba( 0, 0, 0, .5 );
            display: flex;
            flex: 1;
            padding: .5rem;
          }
        `}</style>
      </section>
    );
  }

  return (
    <section>
      Loading...
      <style jsx>{`
        section {
          align-items: center;
          display: flex;
          flex-grow: 1;
          justify-content: center;
        }
      `}</style>
    </section>
  );
}

const movie = gql`
  query Movie($id: ID!) {
    Movie(id: $id) {
      id
      backdrop
      originalTitle
      overview
      poster
      releaseDate
      runtime
      tagline
      title
      ranking {
        bfi
        imdb
        letterboxd
        metacritic
        mubi
        rottenTomatoes
        tmdb
      }
    }
  }
`;

export default graphql(movie, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ data }) => ({ data })
})(Movie);
