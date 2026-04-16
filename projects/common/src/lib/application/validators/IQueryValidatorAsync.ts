/**
 * @description An object that can validate queries data
 */
export interface IQueryValidatorAsync<TQuery> {

    /**
     * 
     * @param query query to validate
     * @throws raises ValidationError if the query has invalid data
     */
    validate(query: TQuery): Promise<void>;
}