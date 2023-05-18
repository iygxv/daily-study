function test() {
  let arr = [];
  arr.push(delay());
}
function delay() {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => {
      console.log(1234);
    }, 1000);
  }
}

test();
