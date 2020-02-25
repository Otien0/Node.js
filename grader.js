//function taking a single parameter: an array of test scores(all numbers)
//returns the average score in the array, rounded to the nearest whole numner

function average(scores){
    var total = 0
    scores.forEach(score => {
        total += score
    });
    var avg  = total/scores.length
    return Math.round(avg)
}

console.log('Average score for Applied Mathematics')
var scores = [90,98,89,100,100,86,94]
console.log(average(scores))

console.log('Average score for Pure Mathematics')
var scores2 = [40,65,77,82,80,54,73,63,95,49]
console.log(average(scores2))