/**
 * @description An object that validates a command asynchronously
 */
export interface ICommandValidatorAsync<TCommand> {

    /**
     * 
     * @param command command to validate
     * @throws raises ValidationError if the command has invalid data
     */
    validate(command: TCommand): Promise<void>;
}