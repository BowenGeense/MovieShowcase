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
import type { ArtworkStatus } from './ArtworkStatus';
import {
    ArtworkStatusFromJSON,
    ArtworkStatusFromJSONTyped,
    ArtworkStatusToJSON,
} from './ArtworkStatus';
import type { TagOption } from './TagOption';
import {
    TagOptionFromJSON,
    TagOptionFromJSONTyped,
    TagOptionToJSON,
} from './TagOption';

/**
 * extended artwork record
 * @export
 * @interface ArtworkExtendedRecord
 */
export interface ArtworkExtendedRecord {
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    episodeId?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    height?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    id?: number;
    /**
     * 
     * @type {string}
     * @memberof ArtworkExtendedRecord
     */
    image?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ArtworkExtendedRecord
     */
    includesText?: boolean;
    /**
     * 
     * @type {string}
     * @memberof ArtworkExtendedRecord
     */
    language?: string;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    movieId?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    networkId?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    peopleId?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    score?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    seasonId?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    seriesId?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    seriesPeopleId?: number;
    /**
     * 
     * @type {ArtworkStatus}
     * @memberof ArtworkExtendedRecord
     */
    status?: ArtworkStatus;
    /**
     * 
     * @type {Array<TagOption>}
     * @memberof ArtworkExtendedRecord
     */
    tagOptions?: Array<TagOption>;
    /**
     * 
     * @type {string}
     * @memberof ArtworkExtendedRecord
     */
    thumbnail?: string;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    thumbnailHeight?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    thumbnailWidth?: number;
    /**
     * The artwork type corresponds to the ids from the /artwork/types endpoint.
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    type?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    updatedAt?: number;
    /**
     * 
     * @type {number}
     * @memberof ArtworkExtendedRecord
     */
    width?: number;
}

/**
 * Check if a given object implements the ArtworkExtendedRecord interface.
 */
export function instanceOfArtworkExtendedRecord(value: object): boolean {
    return true;
}

export function ArtworkExtendedRecordFromJSON(json: any): ArtworkExtendedRecord {
    return ArtworkExtendedRecordFromJSONTyped(json, false);
}

export function ArtworkExtendedRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArtworkExtendedRecord {
    if (json == null) {
        return json;
    }
    return {
        
        'episodeId': json['episodeId'] == null ? undefined : json['episodeId'],
        'height': json['height'] == null ? undefined : json['height'],
        'id': json['id'] == null ? undefined : json['id'],
        'image': json['image'] == null ? undefined : json['image'],
        'includesText': json['includesText'] == null ? undefined : json['includesText'],
        'language': json['language'] == null ? undefined : json['language'],
        'movieId': json['movieId'] == null ? undefined : json['movieId'],
        'networkId': json['networkId'] == null ? undefined : json['networkId'],
        'peopleId': json['peopleId'] == null ? undefined : json['peopleId'],
        'score': json['score'] == null ? undefined : json['score'],
        'seasonId': json['seasonId'] == null ? undefined : json['seasonId'],
        'seriesId': json['seriesId'] == null ? undefined : json['seriesId'],
        'seriesPeopleId': json['seriesPeopleId'] == null ? undefined : json['seriesPeopleId'],
        'status': json['status'] == null ? undefined : ArtworkStatusFromJSON(json['status']),
        'tagOptions': json['tagOptions'] == null ? undefined : ((json['tagOptions'] as Array<any>).map(TagOptionFromJSON)),
        'thumbnail': json['thumbnail'] == null ? undefined : json['thumbnail'],
        'thumbnailHeight': json['thumbnailHeight'] == null ? undefined : json['thumbnailHeight'],
        'thumbnailWidth': json['thumbnailWidth'] == null ? undefined : json['thumbnailWidth'],
        'type': json['type'] == null ? undefined : json['type'],
        'updatedAt': json['updatedAt'] == null ? undefined : json['updatedAt'],
        'width': json['width'] == null ? undefined : json['width'],
    };
}

export function ArtworkExtendedRecordToJSON(value?: ArtworkExtendedRecord | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'episodeId': value['episodeId'],
        'height': value['height'],
        'id': value['id'],
        'image': value['image'],
        'includesText': value['includesText'],
        'language': value['language'],
        'movieId': value['movieId'],
        'networkId': value['networkId'],
        'peopleId': value['peopleId'],
        'score': value['score'],
        'seasonId': value['seasonId'],
        'seriesId': value['seriesId'],
        'seriesPeopleId': value['seriesPeopleId'],
        'status': ArtworkStatusToJSON(value['status']),
        'tagOptions': value['tagOptions'] == null ? undefined : ((value['tagOptions'] as Array<any>).map(TagOptionToJSON)),
        'thumbnail': value['thumbnail'],
        'thumbnailHeight': value['thumbnailHeight'],
        'thumbnailWidth': value['thumbnailWidth'],
        'type': value['type'],
        'updatedAt': value['updatedAt'],
        'width': value['width'],
    };
}

