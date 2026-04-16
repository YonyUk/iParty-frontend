/**
 * @description An object that handle a command and returns a 'TResponse' response
 */
export interface ICommandHandler<TCommand,TResponse>{
    /**
     * 
     * @param command command to handle
     * @returns the result of execute the given command
     * @throws ValidationError if the command has invalid data
     */
    handle(command:TCommand):TResponse
}