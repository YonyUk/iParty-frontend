/**
 * Interface that describes a domain rule
 */
export interface IDomainRule<TValue> {
    /**
     * 
     * @param value value that will be checked if satisfies this rule, raise an error if not
     */
    check(value: TValue): void;
    /**
     * 
     * @param value says when a value is valid for this rule
     */
    isValid(value: TValue): boolean;
}