// @flow
import React from "react";
import { gql, graphql } from "react-apollo";

const logos = [
  {
    name: "BFI",
    link:
      "http://www.bfi.org.uk/films-tv-people/sightandsoundpoll2012/directors",
    img:
      "https://www.bfi.org.uk/films-tv-people/sites/all/themes/bfi2013/images/bfi_logo_transp.png"
  },
  {
    name: "IMDB",
    link: "http://www.imdb.com/chart/top",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/35/IMDb_logo.svg"
  },
  {
    name: "Letterboxd",
    link: "https://letterboxd.com/films/by/rating/size/large/",
    img:
      "https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Letterboxd_logo_%28dark%29.png/600px-Letterboxd_logo_%28dark%29.png"
  },
  {
    name: "Metacritic",
    link: "http://www.metacritic.com/browse/movies/score/metascore/all",
    img:
      "https://upload.wikimedia.org/wikipedia/commons/archive/4/48/20160817031851%21Metacritic_logo.svg"
  },
  {
    name: "Mubi",
    link: "https://mubi.com/films",
    img: "https://assets.mubi.com/assets/one_mubi/logo-mobile@2x.png"
  },
  {
    name: "Rotten Tomatoes",
    link: "https://www.rottentomatoes.com/top/bestofrt/",
    img:
      "https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Rotten_Tomatoes_logo.svg/400px-Rotten_Tomatoes_logo.svg.png"
  },
  {
    name: "TMDB",
    link: "https://www.themoviedb.org/movie/top-rated",
    img:
      "https://www.themoviedb.org/assets/static_cache/8ce4f6ee3ea26190a7f21d1f9e7e9be2/images/v4/logos/182x162.png"
  }
];

type Props = {
  data: {
    allRankings: Array<{
      movie: {
        backdrop: string
      }
    }>
  }
};

function Home({ data: { allRankings } }: Props) {
  return (
    <section
      style={
        allRankings[0] && allRankings[0].movie.backdrop
          ? {
              backgroundImage: `url('https://image.tmdb.org/t/p/w1280${allRankings[0]
                .movie.backdrop}')`
            }
          : { backgroundColor: "#333" }
      }
    >
      <div className="wrapper">
        <h1>
          <em>The</em> Movie List
        </h1>
        <div className="copy">
          <div className="logos">
            {logos.map(logo =>
              <a href={logo.link} key={logo.name}>
                <img src={logo.img} alt={logo.name} />
              </a>
            )}
          </div>
          <p>
            The list to the right is an attempt to combine rankings from
            multiple "top movie lists" to hopefully help surface the greatest
            movies, new and old, creating a new ranking based on how highly each
            source ranks a film.
          </p>
          <p>
            If a movie appeared at all in a list, it was seen as a high
            indicator of quality to make it in the Top 100. When several movies
            appear in the same number of sources, each position is determined on
            its average ranking from all sources.
          </p>
        </div>
      </div>
      <style jsx>{`
        section {
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover !important;
          display: flex;
          flex: 1 1 67%;
        }

        .copy {
          max-width: 48rem;
          width: 100%;
        }

        .logos {
          align-items: center;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          max-width: 100%;
          width: 100%;
        }

        .logos img {
          max-height: 28px;
          padding: 0.5rem;
        }

        .wrapper {
          align-items: center;
          background-color: rgba(0, 0, 0, .67);
          display: flex;
          flex-direction: column;
          flex: 1;
          justify-content: center;
          padding: .5rem;
        }
      `}</style>
    </section>
  );
}

const allRankings = gql`
  query allRankings {
    allRankings(first: 1, orderBy: position_DESC) {
      movie {
        backdrop
      }
    }
  }
`;

export default graphql(allRankings, {
  props: ({ data }) => ({ data })
})(Home);
