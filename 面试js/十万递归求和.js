function sum(total, n) {
    if (n === 0) {
        console.log(total);
        return
    }
    sum(total += n, n - 1)
}
sum(0, 100000)