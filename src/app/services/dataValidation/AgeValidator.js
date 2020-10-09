function AgeValidator(age) {
    const legalAge = 18;

    if (age >= legalAge) return true
    else return false;
};

module.exports = AgeValidator;