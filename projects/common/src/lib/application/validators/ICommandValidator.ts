/**
 * @description An object that can validate commands data
 */
export interface ICommandValidator<TCommand>{
    /**
     * 
     * @param command command to validate
     * @throws raises ValidationError if the command has invalid data
     */
    validate(command:TCommand): void;

}