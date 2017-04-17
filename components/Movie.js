// @flow
import React from "react";
import unescape from "lodash/unescape";
import { gql, graphql } from "react-apollo";
import type { MovieT } from "../types";

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
                <small>({Movie.originalTitle})</small>}
            </h1>
            <h3>
              {Movie.releaseDate.substr(0, 4)}
              {` / `}
              {runtime(Movie.runtime)}
            </h3>
            {Movie.tagline && <h5>{unescape(Movie.tagline)}</h5>}
            <p>{unescape(Movie.overview)}</p>
          </div>
        </div>
        <style jsx>{`
          section {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover !important;
            display: flex;
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
  return <div>Loading</div>;
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
    }
  }
`;

export default graphql(movie, {
  options: ({ id }) => ({ variables: { id } }),
  props: ({ data }) => ({ data })
})(Movie);
