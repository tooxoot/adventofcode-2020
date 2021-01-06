const nums = [0, 20, 7, 16, 1, 18]
let next = 15

const wasCalled = {}

for (let idx = 0; idx < nums.length; idx++) {
  wasCalled[nums[idx]] = idx
}

while (nums.length < 30000000) {
  let lastSpoken = wasCalled[next]

  nums.push(next)
  wasCalled[next] = nums.length - 1

  if (lastSpoken > -1) {
    next = nums.length - lastSpoken - 1
  } else {
    next = 0
  }
}

console.log(nums[nums.length - 1])
