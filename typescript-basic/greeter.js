/**타입 표기
 * function greeter(person: string) {
   return 'Hello,' + person;
   }

   let user = 'Jane User';

   document.body.textContent = greeter(user);
*/
/*인터페이스
  interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person) {
  return 'Hello,' + person.firstName + '' + person.lastName;
}

let user = { firstName: 'Jane', lastName: 'User' };

document.body.textContent = greeter(user);
*/
/*클래스*/
var Student = /** @class */ (function () {
  function Student(firstName, middleInitial, lastName) {
    this.firstName = firstName;
    this.middleInitial = middleInitial;
    this.lastName = lastName;
    this.fullName = firstName + ' ' + middleInitial + ' ' + lastName;
  }
  return Student;
})();
function greeter(person) {
  return 'Hello,' + person.firstName + '' + person.lastName;
}
var user = new Student('Jane', 'M.', 'User');
document.body.textContent = greeter(user);
