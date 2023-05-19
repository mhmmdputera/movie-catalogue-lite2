// eslint-disable-next-line import/named
import { createLikeMovieButtonTemplate, createUnlikeMovieButtonTemplate } from '../views/templates/template-creator';

const LikeButtonPresenter = {
  // eslint-disable-next-line no-shadow
  async init({ likeButtonContainer, favoriteMovies, movie }) {
    this._likeButtonContainer = likeButtonContainer;
    this._movie = movie;
    this._favoriteMovies = favoriteMovies;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._movie;

    if (await this._isMovieExist(id)) {
      this._renderLiked();
    } else {
      this._renderLike();
    }
  },

  async _isMovieExist(id) {
    const movie = await this._favoriteMovies.getMovie(id);
    return !!movie;
  },

  _renderLike() {
    this._likeButtonContainer.innerHTML = createLikeMovieButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      // eslint-disable-next-line no-undef
      await this._favoriteMovies.putMovie(this._movie);
      this._renderButton();
    });
  },

  _renderLiked() {
    this._likeButtonContainer.innerHTML = createUnlikeMovieButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      // eslint-disable-next-line no-undef
      await this._favoriteMovies.deleteMovie(this._movie.id);
      this._renderButton();
    });
  },
};

export default LikeButtonPresenter;
