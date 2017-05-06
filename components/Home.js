// @flow
import React from "react";
import { gql, graphql } from "react-apollo";

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
        allRankings[0].movie.backdrop
          ? {
              backgroundImage: `url('https://image.tmdb.org/t/p/w1280${allRankings[0].movie.backdrop}')`
            }
          : { backgroundColor: "#333" }
      }
    >
      <div className="wrapper">
        <h1><em>The</em> Movie List</h1>
        <div className="copy">
          <p>
            When I watch movies, I usually like to make sure I pick a good one to watch. But the question is always, how do I find good movies?
          </p>
          <p>
            I tend to gravitate towards looking at a bunch of "top movies" lists, but it can be tough to sort through them all.
          </p>
          <p>
            The list on your right is an attempt to combine rankings from multiple sources to hopefully help surface the greatest movies, new and old, creating a new ranking based on how highly each source ranks a film.
          </p>
          <div className="logos">
            <img
              src="https://www.bfi.org.uk/films-tv-people/sites/all/themes/bfi2013/images/bfi_logo_transp.png"
              alt="BFI"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/35/IMDb_logo.svg"
              alt="IMDB"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e3/Letterboxd_logo_%28dark%29.png/600px-Letterboxd_logo_%28dark%29.png"
              alt="Letterboxd"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/archive/4/48/20160817031851%21Metacritic_logo.svg"
              alt="Metacritic"
            />
            <img
              src="https://assets.mubi.com/assets/one_mubi/logo-mobile@2x.png"
              alt="Mubi"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6f/Rotten_Tomatoes_logo.svg/400px-Rotten_Tomatoes_logo.svg.png"
              alt="Rotten Tomatoes"
            />
            <img
              src="https://www.themoviedb.org/assets/static_cache/8ce4f6ee3ea26190a7f21d1f9e7e9be2/images/v4/logos/182x162.png"
              alt="TMDB"
            />
          </div>
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
          background-color: rgba( 0, 0, 0, .67 );
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
    allRankings(first:1, orderBy: position_DESC) {
      movie {
        backdrop
      }
    }
  }
`;

export default graphql(allRankings, {
  props: ({ data }) => ({ data })
})(Home);
