Date.prototype.format = function() {
    let s = '';
    let mouth = (this.getMonth() + 1)>=10?(this.getMonth() + 1):('0'+(this.getMonth() + 1));
    let day = this.getDate()>=10?this.getDate():('0'+this.getDate());
    s += this.getFullYear() + '-'; // 获取年份。
    s += mouth + "-"; // 获取月份。
    s += day; // 获取日。
    return (s); // 返回日期。
};

function getAll(begin, end) {
    const array = []
    let ab = begin.split("-");
    let ae = end.split("-");
    let db = new Date();
    db.setUTCFullYear(ab[0], ab[1] - 1, ab[2]);
    let de = new Date();
    de.setUTCFullYear(ae[0], ae[1] - 1, ae[2]);
    let unixDb = db.getTime();
    let unixDe = de.getTime();
    for (let k = unixDb; k <= unixDe;) {
        array.push((new Date(parseInt(k))).format())
        k = k + 24 * 60 * 60 * 1000;
    }
    return array
}

export { getAll }