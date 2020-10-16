const { CPFValidator } = require('../../src/domain/user');

describe('Services: Validators', () => {
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