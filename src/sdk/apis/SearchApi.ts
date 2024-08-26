/* tslint:disable */
/* eslint-disable */
/**
 * TVDB API V4
 * Documentation of [TheTVDB](https://thetvdb.com/) API V4. All related information is linked from our [Github repo](https://github.com/thetvdb/v4-api). You might also want to use our [Postman collection] (https://www.getpostman.com/collections/7a9397ce69ff246f74d0) ## Authentication 1. Use the /login endpoint and provide your API key as \"apikey\". If you have a user-supported key, also provide your subscriber PIN as \"pin\". Otherwise completely remove \"pin\" from your call. 2. Executing this call will provide you with a bearer token, which is valid for 1 month. 3. Provide your bearer token for subsequent API calls by clicking Authorize below or including in the header of all direct API calls: `Authorization: Bearer [your-token]`  ## Notes 1. \"score\" is a field across almost all entities.  We generate scores for different types of entities in various ways, so no assumptions should be made about the meaning of this value.  It is simply used to hint at relative popularity for sorting purposes. 
 *
 * The version of the OpenAPI document: 4.7.10
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  GetSearchResults200Response,
  GetSearchResultsByRemoteId200Response,
} from '../models/index';
import {
    GetSearchResults200ResponseFromJSON,
    GetSearchResults200ResponseToJSON,
    GetSearchResultsByRemoteId200ResponseFromJSON,
    GetSearchResultsByRemoteId200ResponseToJSON,
} from '../models/index';

export interface SearchApiGetSearchResultsRequest {
    query?: string;
    q?: string;
    type?: string;
    year?: number;
    company?: string;
    country?: string;
    director?: string;
    language?: string;
    primaryType?: string;
    network?: string;
    remoteId?: string;
    offset?: number;
    limit?: number;
}

export interface SearchApiGetSearchResultsByRemoteIdRequest {
    remoteId: string;
}

/**
 * 
 */
export class SearchApi extends runtime.BaseAPI {

    /**
     * Our search index includes series, movies, people, and companies. Search is limited to 5k results max.
     */
    async getSearchResultsRaw(requestParameters: SearchApiGetSearchResultsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetSearchResults200Response>> {
        const queryParameters: any = {};

        if (requestParameters['query'] != null) {
            queryParameters['query'] = requestParameters['query'];
        }

        if (requestParameters['q'] != null) {
            queryParameters['q'] = requestParameters['q'];
        }

        if (requestParameters['type'] != null) {
            queryParameters['type'] = requestParameters['type'];
        }

        if (requestParameters['year'] != null) {
            queryParameters['year'] = requestParameters['year'];
        }

        if (requestParameters['company'] != null) {
            queryParameters['company'] = requestParameters['company'];
        }

        if (requestParameters['country'] != null) {
            queryParameters['country'] = requestParameters['country'];
        }

        if (requestParameters['director'] != null) {
            queryParameters['director'] = requestParameters['director'];
        }

        if (requestParameters['language'] != null) {
            queryParameters['language'] = requestParameters['language'];
        }

        if (requestParameters['primaryType'] != null) {
            queryParameters['primaryType'] = requestParameters['primaryType'];
        }

        if (requestParameters['network'] != null) {
            queryParameters['network'] = requestParameters['network'];
        }

        if (requestParameters['remoteId'] != null) {
            queryParameters['remote_id'] = requestParameters['remoteId'];
        }

        if (requestParameters['offset'] != null) {
            queryParameters['offset'] = requestParameters['offset'];
        }

        if (requestParameters['limit'] != null) {
            queryParameters['limit'] = requestParameters['limit'];
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/search`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetSearchResults200ResponseFromJSON(jsonValue));
    }

    /**
     * Our search index includes series, movies, people, and companies. Search is limited to 5k results max.
     */
    async getSearchResults(requestParameters: SearchApiGetSearchResultsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSearchResults200Response> {
        const response = await this.getSearchResultsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Search a series, movie, people, episode, company or season by specific remote id and returns a base record for that entity.
     */
    async getSearchResultsByRemoteIdRaw(requestParameters: SearchApiGetSearchResultsByRemoteIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetSearchResultsByRemoteId200Response>> {
        if (requestParameters['remoteId'] == null) {
            throw new runtime.RequiredError(
                'remoteId',
                'Required parameter "remoteId" was null or undefined when calling getSearchResultsByRemoteId().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("bearerAuth", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/search/remoteid/{remoteId}`.replace(`{${"remoteId"}}`, encodeURIComponent(String(requestParameters['remoteId']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetSearchResultsByRemoteId200ResponseFromJSON(jsonValue));
    }

    /**
     * Search a series, movie, people, episode, company or season by specific remote id and returns a base record for that entity.
     */
    async getSearchResultsByRemoteId(requestParameters: SearchApiGetSearchResultsByRemoteIdRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetSearchResultsByRemoteId200Response> {
        const response = await this.getSearchResultsByRemoteIdRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
