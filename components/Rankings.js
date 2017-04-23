// @flow
import React from "react";
import toPairs from "ramda/src/toPairs";
import type { RankingNoMovieT } from "../types";

type Props = { rankings: RankingNoMovieT };

export default ({ rankings }: Props) => {
  const {
    bfi,
    imdb,
    letterboxd,
    metacritic,
    mubi,
    rottenTomatoes,
    tmdb
  } = rankings;
  return (
    <div>
      {bfi &&
        <span>
          <img
            src="https://pbs.twimg.com/profile_images/2283401819/wfh088gwk95ryyhauphu_bigger.png"
            alt="BFI"
            title="BFI"
          />
          {bfi}
        </span>}
      {imdb &&
        <span>
          <img
            src="https://pbs.twimg.com/profile_images/780796992611942405/qj7ytv9v_bigger.jpg"
            alt="IMDB"
            title="IMDB"
          />
          {imdb}
        </span>}
      {letterboxd &&
        <span>
          <img
            src="https://pbs.twimg.com/profile_images/2529194120/f383glyd16f8sm5e0wnv_bigger.png"
            alt="Letterboxd"
            title="Letterboxd"
          />
          {letterboxd}
        </span>}
      {metacritic &&
        <span>
          <img
            src="https://pbs.twimg.com/profile_images/527528131171590144/EQXs3lpX_bigger.png"
            alt="Metacritic"
            title="Metacritic"
          />
          {metacritic}
        </span>}
      {mubi &&
        <span>
          <img
            src="https://pbs.twimg.com/profile_images/536840176912187393/XFLZlqJt_bigger.png"
            alt="Mubi"
            title="Mubi"
          />
          {mubi}
        </span>}
      {rottenTomatoes &&
        <span>
          <img
            src="https://pbs.twimg.com/profile_images/811034417850220544/NDVQTlyz_bigger.jpg"
            alt="RottenTomatoes"
            title="RottenTomatoes"
          />
          {rottenTomatoes}
        </span>}
      {tmdb &&
        <span>
          <img
            src="https://pbs.twimg.com/profile_images/789117657714831361/zGfknUu8_bigger.jpg"
            alt="The Movie DB"
            title="The Movie DB"
          />
          {tmdb}
        </span>}
      <style jsx>{`
        div {
          display: flex;
        }

        img {
          margin-right: 0.25rem;
          max-width: 1.25rem;
        }

        span {
          align-items: center;
          background: rgba(255, 255, 255, .9);
          border-radius: 4px;
          color: #333;
          display: flex;
          margin-right: 0.5rem;
          padding-right: 0.33rem;
        }
      `}</style>
    </div>
  );
};
