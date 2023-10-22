export const formatNumber = (num) => {
    if (num >= 1000000) {
        return num / 1000000 + "M";
    } else if (num >= 1000) {
        return num / 1000 + "K";
    } else {
        return num;
    }
};

