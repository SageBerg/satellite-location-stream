module.exports = {
    secondOrSeconds: function(number) {
        if (number !== 1) {
            return 'seconds';
        }
        return 'second';
    },
    validateCMDArgs: function () {
        return process.argv.length === 4 &&
            !isNaN(parseInt(process.argv[2])) &&
            !isNaN(parseInt(process.argv[3])) &&
            parseInt(process.argv[2]) > 0 &&
            parseInt(process.argv[3]) > 0;
    }
};
