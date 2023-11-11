/* tslint:disable */
/* eslint-disable */
/**
 * Financial API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface SavingDto
 */
export interface SavingDto {
    /**
     * 
     * @type {number}
     * @memberof SavingDto
     */
    id?: number;
    /**
     * 
     * @type {number}
     * @memberof SavingDto
     */
    ownerId?: number;
    /**
     * 
     * @type {string}
     * @memberof SavingDto
     */
    amount?: string;
    /**
     * 
     * @type {string}
     * @memberof SavingDto
     */
    currency?: string;
    /**
     * 
     * @type {Date}
     * @memberof SavingDto
     */
    date?: Date;
}

/**
 * Check if a given object implements the SavingDto interface.
 */
export function instanceOfSavingDto(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SavingDtoFromJSON(json: any): SavingDto {
    return SavingDtoFromJSONTyped(json, false);
}

export function SavingDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): SavingDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'ownerId': !exists(json, 'ownerId') ? undefined : json['ownerId'],
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
        'currency': !exists(json, 'currency') ? undefined : json['currency'],
        'date': !exists(json, 'date') ? undefined : (new Date(json['date'])),
    };
}

export function SavingDtoToJSON(value?: SavingDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'ownerId': value.ownerId,
        'amount': value.amount,
        'currency': value.currency,
        'date': value.date === undefined ? undefined : (value.date.toISOString().substring(0,10)),
    };
}
