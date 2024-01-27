## Composing Types

1. Unions

- 타입이 여러 타입 중 하나일 수 있음을 선언하는 방법

```typescript
type WindowStates = 'open' | 'closed' | 'minimized';
type LockStates = 'locked' | 'unlocked';
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
```

2. Generics

- 타입에 변수를 제공하는 방법

```typescript
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

## Structural Type System

- 두 객체가 같은 형태를 가지면 같은 것으로 간주
- 객체 또는 클래스에 필요한 모든 속성이 존재한다면, 구현 세부 정보에 관계없이 일치하게 봄.

## 기본 타입

- Boolean,Number,String,Array,Tuple,Enum,Void,Null and Undefined,Object
- Any
  - 알지 못하는 타입을 표현
  - 타입의 일부만 알고 전체는 알지 못할 때 유용
  ```typescript
  let notSure: any = 4;
  notSure = 'maybe a string instead';
  notSure = false;
  ```
- Never
  - 절대 발생할 수 없는 타입

### Type assertions

- 개발자가 컴파일러에게 타입을 알려주는 방법
- angle-bracket 문법

```typescript
let someValue: any = 'this is a string';

let strLength: number = (<string>someValue).length;
```

- as 문법

```typescript
let someValue: any = 'this is a string';

let strLength: number = (someValue as string).length;
```

## 인터페이스

### Optional Properties

- 선택적 프로퍼티는 선언에서 프로퍼티 이름 끝에 ?를 붙여 표시
- 인터페이스에 속하지 않는 프로퍼티의 사용 방지

```typescript
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: 'white', area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: 'black' });
```

### Readonly properties

- 객체가 처음 생성될 때만 할당 가능
- 프로퍼티 이름 앞에 readonly를 넣어서 지정

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // 오류!
```

### Excess Property Checks

- 객체 리터럴이 target type이 가지고 있지 않은 프로퍼티를 가지고 있으면 excess property checking에 의한 에러 발생
- 검사를 피하기 위해서는 타입 단언/문자열 인덱스 서명/새로운 변수에 할당 사용

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}

// error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
let mySquare = createSquare({ colour: 'red', width: 100 });
```
