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

import { mapValues } from '../runtime';
import type { MovieExtendedRecord } from './MovieExtendedRecord';
import {
    MovieExtendedRecordFromJSON,
    MovieExtendedRecordFromJSONTyped,
    MovieExtendedRecordToJSON,
} from './MovieExtendedRecord';

/**
 * 
 * @export
 * @interface GetMovieExtended200Response
 */
export interface GetMovieExtended200Response {
    /**
     * 
     * @type {MovieExtendedRecord}
     * @memberof GetMovieExtended200Response
     */
    data?: MovieExtendedRecord;
    /**
     * 
     * @type {string}
     * @memberof GetMovieExtended200Response
     */
    status?: string;
}

/**
 * Check if a given object implements the GetMovieExtended200Response interface.
 */
export function instanceOfGetMovieExtended200Response(value: object): boolean {
    return true;
}

export function GetMovieExtended200ResponseFromJSON(json: any): GetMovieExtended200Response {
    return GetMovieExtended200ResponseFromJSONTyped(json, false);
}

export function GetMovieExtended200ResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GetMovieExtended200Response {
    if (json == null) {
        return json;
    }
    return {
        
        'data': json['data'] == null ? undefined : MovieExtendedRecordFromJSON(json['data']),
        'status': json['status'] == null ? undefined : json['status'],
    };
}

export function GetMovieExtended200ResponseToJSON(value?: GetMovieExtended200Response | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'data': MovieExtendedRecordToJSON(value['data']),
        'status': value['status'],
    };
}

