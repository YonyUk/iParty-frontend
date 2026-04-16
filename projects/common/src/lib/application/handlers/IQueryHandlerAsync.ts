/**
 * @description An object that handle a command and returns a 'TResponse' response
 */
export interface IQueryHandlerAsync<TQuery,TResponse>{
    /**
     * 
     * @param query command to handle
     * @returns the result of execute the given query
     * @throws ValidationError if the query has invalid data
     */
    handle(query:TQuery):Promise<TResponse>;
}