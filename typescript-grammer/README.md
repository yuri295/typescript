## 인터페이스 선언

- 대문자로 선언
- 한 줄로 입력할 때는 콤마나 세미콜론으로 속성 구분

```ts
interface Person {
  name: string;
  age: number;
  married: boolean;
}
```

### 인터페이스 선언 병합

- 같은 이름으로 여러 인터페이스를 선언하여 병합 가능
- 속성이 같으면 타입도 같아야 함.

```ts
interface Merge {
  one: string;
}
interface Merge {
  two: number;
}
const example: Merge = {
  one: '1',
  two: 2,
};
```

### 네임스페이스

- 네임스페이스 선언으로 의도치 않은 인터페이스 병합 방지
- 내부 인터페이스를 export하여 사용

```ts
namespace Example {
  export interface Inner {
    test: string;
  }
  export type test2 = number;
}
const ex1: Example.Inner = {
  test: 'hello',
};
const ex2: Example.test2 = 123;
```

## 객체의 속성에 적용되는 특징

- optional(?)
  - 속성이 있어도 되고 없어도 됨.
- readonly
  - 값을 읽는 것만 가능

### 인덱스 접근 타입

- 객체 속성의 타입에 접근하는 방식

```ts
type Animal = {
  name: string;
};

type N1 = Animal['name'];
// type N1 = string
type N2 = Animal['name'];
type N3 = Animal.name;
// Cannot access 'Animal.name' because 'Animal' is a type, but not a namespace. Did you mean to retrieve the type of the property 'name' in 'Animal' with 'Animal["name"]'?
```

- 인덱스 접근 타입을 활용해 특정 키들의 값 타입만 추릴 수 있음.

```
const obj = {
  hello: 'world',
  name: 'zero',
  age: 28,
};
type Values = typeof obj['hello' | 'name'];
// type Values = string
```

### 매핑된 객체 타입

- 기존의 다른 타입으로부터 새로운 객체 속성을 만들어내는 타입

```ts
interface Original {
  name: string;
  age: number;
  married: boolean;
}
type Copy = {
  [key in keyof Original]: Original[key];
};
/*
type Copy = {
  name: string;
  age: number;
  married: boolean;
}
*/
```

## 타입과 집합

- 유니언: 합집합

```ts
let strOrNum: string | number = 'hello';
strOrNum = 123;
```

- 인터섹션: 교집합

```ts
type nev = string & number;
// type nev = never
```

- unknown: 전체집합
- never: 공집합

## 타입의 상속

- extends 예약어를 사용해서 기존 타입 상속

```ts
interface Animal {
  name: string;
}
interface Dog extends Animal {
  bark(): void;
}
interface Cat extends Animal {
  meow(): void;
}
```

- 타입 별칭에서도 상속 가능
  - &와 |사용

```ts
type Animal = {
  name: string;
};
type Dog = Animal & {
  bark(): void;
};
type Cat = Animal & {
  meow(): void;
};
type Name = Cat['name'];
```

- 타입 별칭과 인터페이스 간의 상속 가능

## 객체 간 대입 가능 여부

- 변수를 대입할 때는 객체 간에 대입할 수 있는지 따져봐야 함.
- 조건이 구체적인 타입이 더 좁은 타입-> 넓은 타입을 좁은 타입에 대입할 수 없음.
- 튜플은 배열보다 좁은 타입
- readonly 수식어가 붙은 배열이 더 넓은 타입
- optional 객체가 더 넓은 타입

### 구조적 타이핑

- 객체 타입의 이름이 달라도 구조가 동일하면 같은 객체로 인식
- 서로 대입하지 못하게 하기 위해 서로를 구분하기 위한 속성 추가
- \_\_type과 같은 속성을 브랜드(brand)속성이라고 부르며, 이를 사용하는 것을 브랜딩(branding)한다고 표현

```ts
interface Money {
  __type: 'money';
  amount: number;
  unit: string;
}

interface Liter {
  __type: 'liter';
  amount: number;
  unit: string;
}

const liter: Liter = { amount: 1, unit: 'liter', __type: 'liter' };
const circle: Money = liter;
// Type 'Liter' is not assignable to type 'Money'. Types of property '__type' are incompatible. Type '"liter"' is not assignable to type '"money"'.
```

## 제네릭

- <>로 표현
- 제네릭을 사용하여 타입 간 중복 제거

```ts
interface Person<N, A> {
  type: 'human';
  race: 'yellow';
  name: N;
  age: A;
}
interface Zero extends Person<'zero', 28> {}
interface Nero extends Person<'nero', 32> {}
```

### 제네릭에 제약 걸기

- extends로 표시

```ts
interface Example<A extends number, B = string> {
  a: A;
  b: B;
}
type Usecase1 = Example<string, boolean>;
// Type 'string' does not satisfy the constraint 'number'.
type Usecase2 = Example<1, boolean>;
type Usecase3 = Example<number>;
```

## 컨디셔널 타입

- 조건에 따라 다른 타입이 되는 것
- 특정 타입 extends 다른 타입 ? 참일 때 타입 : 거짓일 때 타입

### 컨디셔널 타입 분배 법칙

- 타입이 제네릭이면서 유니언이면 분배 법칙이 실행됨.

```ts
type Start = string | number;
type Result<Key> = Key extends string ? Key[] : never;
let n: Result<Start> = ['hi'];
// let n: string[]
```

- 배열로 제네릭을 감싸면 분배 법칙이 일어나지 않음.

```ts
type IsString<T> = [T] extends [string] ? true : false;
type Result = IsString<'hi' | 3>;
// type Result = false
```

## 오버로딩

- 호출할 수 있는 함수의 타입을 미리 여러 개 타이핑해두는 기법

```ts
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: any, y: any) {
  return x + y;
}

add(1, 2); // 3
add('1', '2'); // 12
add(1, '2');
add('1', 2);
// No overload matches this call. Overload 1 of 2, '(x: number, y: number): number', gave the following error. Argument of type 'string' is not assignable to parameter of type 'number'. Overload 2 of 2, '(x: string, y: string): string', gave the following error. Argument of type 'number' is not assignable to parameter of type 'string'.
```

## 콜백 함수의 매개변수 생략

```ts
function example(callback: (error: Error, result: string) => void) {}
example((e, r) => {}); //인수로 제공하는 함수의 매개변수에는 타입을 표기하지 않아도 됨.
example(() => {}); //매개변수를 사용하지 않아도 됨.
example(() => true); //반환값이 void일 때는 어떠한 반환값이 와도 상관없음.
```
