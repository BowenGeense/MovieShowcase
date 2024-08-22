import { PRIVATE_API_BASE_URL, PRIVATE_BEARER } from '$env/static/private';
import type { ServerLoad } from '@sveltejs/kit';
import type { Movie } from '../interfaces/Movie';
import type { Franchise } from '../interfaces/Franchise';

export const load: ServerLoad = async ({ url }) => {
    const id = url.searchParams.get('franchiseId') || '17'; // Default to Star Wars

    try {
        const response = await fetch(`${PRIVATE_API_BASE_URL}lists/${id}/extended`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Authorization': PRIVATE_BEARER
            }
        });

        if (!response.ok) {
            return {
                status: response.status,
                error: 'Failed to fetch franchise data'
            };
        }

        const data = await response.json();
        const franchise: Franchise = data.data;

        const moviePromises = franchise.entities
            .filter((entity: { movieId: number | null }) => entity.movieId !== null)
            .map(async (entity: { movieId: number | null }) => {
                const movieResponse = await fetch(`${PRIVATE_API_BASE_URL}movies/${entity.movieId}/extended?meta=translations`, {
                    method: 'GET',
                    headers: {
                        'accept': 'application/json',
                        'Authorization': PRIVATE_BEARER
                    }
                });

                if (!movieResponse.ok) {
                    console.error(`Failed to fetch movie data for ID ${entity.movieId}:`, movieResponse.statusText);
                    return null;
                }
                const movieData = await movieResponse.json();
                const movie: Movie = movieData.data;

                return movie;
            });

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