function printNested() {
  const nestedObj = {
    npmjs: {
      lib: 'yeoman'
    }
  }

  console.log('area:', nestedObj?.npmjs?.lib);
  console.log('area:', nestedObj?.wrong?.prop);
  
}
printNested();

const sum = (a, b) => a + b;

export default sum;
