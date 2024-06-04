#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.redBright("=").repeat(50));
console.log(chalk.greenBright.italic.bold("\n\tWelcome to 'Kaxh' OOP Project\n"));
console.log(chalk.redBright("=").repeat(50));

class Student {
  name: string;
  constructor(n: string) {
    this.name = n;
  }
}

class Person {
  students: Student[] = [];
  addStudent(obj: Student) {
    this.students.push(obj);
  }
}

const persons = new Person();

const programStart = async (persons: Person) => {
  do {

    const ans = await inquirer.prompt([
      {
        name: "select",
        type: "list",
        message: chalk.cyanBright("Whom would you like to interect with?"),
        choices: ["staff", "student", "exit"],
      },
    ]);
    if (ans.select == "staff") {
      console.log(chalk.green(
        "\nYou approach the staff room, Please feel free to ask any question!\n"
      ));
    } else if (ans.select == "student") {
      const ans = await inquirer.prompt([
        {
          name: "student",
          type: "input",
          message: chalk.yellowBright("\nEnter the student's name you wish to engage with:"),
        },
      ]);
      const student = persons.students.find((val) => val.name == ans.student);
      if (!student) {
        const name = new Student(ans.student);
        persons.addStudent(name);
        console.log(chalk.magentaBright(`\nHello i am ${chalk.cyanBright.bold.italic(name.name)}. Nice to meet you!\n`));
        console.log(chalk.green("New student added.\n"));
        console.log(chalk.cyan("Current student list:\n"));
        console.log(persons.students);
      } else {
        console.log(chalk.magentaBright(`\nHello i am ${chalk.cyanBright.italic.bold(student.name)}. Nice to see you again!\n`));
        console.log(chalk.yellow("Existing student list:\n"));
        console.log(persons.students);
      }
    } else if (ans.select == "exit") {
      console.log(chalk.redBright("\nExisting the program....."));
      process.exit();
    }
  } while (true);
};

programStart(persons);
