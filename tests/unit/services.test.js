const { AgeValidator, CPFValidator } = require('../../src/app/services');

describe('Services: Validators', () => {
    describe('Age validation module', () => {
        it('should return false for underaged values', () => {
            expect(AgeValidator(17)).toBeFalsy();
        });
        it('should return true for upperaged values', () => {
            expect(AgeValidator(19)).toBeTruthy();
        });
        it('should return true for equally aged values', () => {
            expect(AgeValidator(18)).toBeTruthy();
        });
    });

    describe('CPF validation module', () => {
        it('should return false for invalid cpf strings', () => {
            expect(CPFValidator('11122233344456')).toBeFalsy();
        });
        it('should return false for invalid cpf strings', () => {
            expect(CPFValidator('11122244456')).toBeFalsy();
        });
        it('should return true for valid cpf strings', () => {
            expect(CPFValidator('093.978.910-81')).toBeTruthy();
        });
        it('should return true for valid cpf strings', () => {
            expect(CPFValidator('09397891081')).toBeTruthy();
        });
    });
});