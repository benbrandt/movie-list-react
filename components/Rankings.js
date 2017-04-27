// @flow
import React from "react";
import prop from "ramda/src/prop";
import sortBy from "ramda/src/sortBy";
import toPairs from "ramda/src/toPairs";
import type { RankingNoMovieT } from "../types";

type Props = { rankings: RankingNoMovieT };

const logos: { [id: string]: { label: string, img: string } } = {
  bfi: {
    label: "BFI",
    img: "https://pbs.twimg.com/profile_images/2283401819/wfh088gwk95ryyhauphu_bigger.png"
  },
  imdb: {
    label: "IMDB",
    img: "https://pbs.twimg.com/profile_images/780796992611942405/qj7ytv9v_bigger.jpg"
  },
  letterboxd: {
    label: "Letterboxd",
    img: "https://pbs.twimg.com/profile_images/2529194120/f383glyd16f8sm5e0wnv_bigger.png"
  },
  metacritic: {
    label: "Metacritic",
    img: "https://pbs.twimg.com/profile_images/527528131171590144/EQXs3lpX_bigger.png"
  },
  mubi: {
    label: "Mubi",
    img: "https://pbs.twimg.com/profile_images/536840176912187393/XFLZlqJt_bigger.png"
  },
  rottenTomatoes: {
    label: "RottenTomatoes",
    img: "https://pbs.twimg.com/profile_images/811034417850220544/NDVQTlyz_bigger.jpg"
  },
  tmdb: {
    label: "The Movie DB",
    img: "https://pbs.twimg.com/profile_images/789117657714831361/zGfknUu8_bigger.jpg"
  }
};

export default ({ rankings }: Props) => {
  const sortedRankings = sortBy(prop(1), toPairs(rankings));
  return (
    <div>
      {sortedRankings.map(
        ([source, value]) =>
          value &&
          logos[source] &&
          <span key={source}>
            <img
              src={logos[source].img}
              alt={logos[source].label}
              title={logos[source].label}
            />
            {value}
          </span>
      )}
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
