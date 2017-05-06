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

type Props = { data: { Movie: ?MovieT } };

const Description = ({ data: { Movie } }: Props) =>
  Movie
    ? <div className="description">
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
        <style jsx>{`
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
      `}</style>
      </div>
    : null;

const movie = gql`
  query Movie($id: ID!) {
    Movie(id: $id) {
      id
      originalTitle
      overview
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
})(Description);
