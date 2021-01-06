const nums = [0, 20, 7, 16, 1, 18].reverse()
let next = 15

while (nums.length < 2020) {
  const lastSpoken = nums.findIndex(n => n === next)

  nums.unshift(next)
  if (lastSpoken > -1) {
    next = lastSpoken + 1
  } else {
    next = 0
  }
}

console.log(nums[0])
