function SimpleLogger(constructor: Function) {
    console.log(`Class ${constructor.name} is instantiated!`);
  }
  
function ReadOnly(target: any, key: string, descriptor: PropertyDescriptor):void {
   descriptor.set = undefined;
  }
  
function LogMethod(target: any, key: string, descriptor: PropertyDescriptor):void {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Method called: ${key}`, args);
        return originalMethod.apply(this, args);
    };
  }

@SimpleLogger
class MyTestClass {
  property1: any;
  property2: number;

constructor(property1: string, property2: number) {
  this.property1 = property1;
  this.property2 = property2;
}

@ReadOnly
get prop1() {
  return this.property1;
}

@LogMethod
method1(): void {
}
}

const test = new MyTestClass("ab", 1);
test.method1();

export { MyTestClass }