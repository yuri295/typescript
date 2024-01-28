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

```
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