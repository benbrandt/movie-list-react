// @flow
import React from "react";
import unescape from "lodash/unescape";

type Props = { poster: ?string, title: string };

export default ({ poster, title }: Props) =>
  poster
    ? <img
        src={`https://image.tmdb.org/t/p/w500${poster}`}
        alt={unescape(title)}
        style={{ width: "calc(100% / 3)" }}
      />
    : null;
