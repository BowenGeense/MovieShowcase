import { PRIVATE_BEARER } from '$env/static/private';
import type { ServerLoad } from '@sveltejs/kit';
import {Configuration, ListsApi, MoviesApi, GetMovieExtendedMetaEnum} from '../sdk';
import type { ListsApiGetListExtendedRequest } from '../sdk';
import type { Entity } from '../sdk';

export const load: ServerLoad = async ({ url }) => {
  const id: number = Number(url.searchParams.get('franchiseId')) || 17; // Default to Star Wars

  const config = new Configuration({
    headers: {
      'Authorization': `Bearer ${PRIVATE_BEARER}`
    }
  });

  const listsApi = new ListsApi(config);
  const moviesApi = new MoviesApi(config);

  try {
    const response = await listsApi.getListExtended(
        { id } as ListsApiGetListExtendedRequest
    );

    if (!response.status) {
      console.error(`Failed to fetch movie data for ID ${response.data?.id}:`, response.status);
      return null;
    }
    const moviePromises = response.data?.entities
        ? response.data.entities
            .filter((entity: Entity) => entity.movieId !== undefined)
            .map(async (entity: Entity) => {
              const movieExtendedResponse = await moviesApi.getMovieExtended({
                id: entity.movieId as number,
                meta: GetMovieExtendedMetaEnum.Translations
              });

              if (!movieExtendedResponse.status) {
                console.error(`Failed to fetch movie data for ID ${entity.movieId}:`, movieExtendedResponse.status);
                return null;
              }
              return movieExtendedResponse.data;
            })
        : [];

    const movieResults = await Promise.all(moviePromises);
    const movies = movieResults.filter(movie => movie !== null);

    return {
      movies
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      status: 500,
      error: 'Internal Server Error'
    };
  }
};