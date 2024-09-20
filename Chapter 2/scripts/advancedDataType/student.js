// const students = ["David", "Fariq", "Zaky", "Shanty", "Putra"];
// console.log(students[1]);

const david = {
    name: "David Vincent Gurning",
    nickname: "David",
    class: "FSW-1",
    address: {
        province: "North Sumatera",
        city: "Medan",
    },
    education: {
        bachelor: "Univeritas Teknologi Del",
    },
};
// console.log(david.education.bachelor);

const students = [
    {
        name: "David Vincent Gurning",
        nickname: "David",
        class: "FSW-1",
        address: {
            province: "North Sumatera",
            city: "Medan",
        },
        education: {
            bachelor: "Univeritas Teknologi Del",
        }
    },
    {
        name: "Yudriqul Aulia",
        nickname: "Yudi",
        class: "FSW-1",
        address: {
            province: "Jambi",
            city: "Jambi",
        },
        education: {
            bachelor: "Univeritas Jambi",
        }
    },
    {
        name: "Iko Indra Gunawan",
        nickname: "Iko",
        class: "FSW-1",
        address: {
            province: "East Java",
            city: "Surabaya",
        },
        education: {
            bachelor: "UPN Veteran East Java",
        }
    },
    {
        name: "Arswendo Erza Sadewa",
        nickname: "Erza",
        class: "FSW-1",
        address: {
            province: "Lampung",
            city: "lampung",
        },
        education: {
            bachelor: "Universitas Lampung",
        }
    },
    {
        name: "Dhiya Ul Faruq",
        nickname: "Faruq",
        class: "FSW-1",
        address: {
            province: "East Java",
            city: "Jember",
        },
        education: {
            bachelor: "Universitas Jember",
        }
    },
    {
        name: "Fariq Abdhe Manaf",
        nickname: "Fariq",
        class: "FSW-1",
        address: {
            province: "East Java",
            city: "Jember",
        },
        education: {
            bachelor: "Universitas Jember",
        }
    },
];

// My name is David Vincent Gurning, used to called David. Now I am student at Univeritas Teknologi Del. I am from Medan, North Sumatera.

// // Normal String
// const describeDavid = 
//     "My name is " +
//     david.name +
//     ", used to called "+
//     david.nickname +
//     ". Now I am student at " +
//     david.education.bachelor +
//     ". I am from " +
//     david.address.city +
//     ", " +
//     david.address.province +
//     ".";
// console.log(describeDavid);

// console.log("My name is " + david.name + ", used to called "+ david.nickname +". Now I am student at " + david.education.bachelor + ". I am from " + david.address.city + ", " + david.address.province + ".");

// // Backtick String (Recomanded)
console.log(`My name is ${david.name}, used to called ${david.nickname}. Now I am student at ${david.education.bachelor}. I am from ${david.address.city}, ${david.address.province}.`);

console.log("------------------------------")

// There are three students, David, Yudi, and Iko. David is from Medan, North Sumatera. Yudi is from Jambi, Jambi. And Iko is from Surabaya, East Java.

console.log(`There are three students, ${students[0].nickname}, ${students[1].nickname}, and ${students[2].nickname}. ${students[0].nickname} is from ${students[0].address.city}, ${students[0].address.province}. ${students[1].nickname} is from ${students[1].address.city}, ${students[1].address.province}. And ${students[2].nickname} is from ${students[2].address.city}, ${students[2].address.province}.`);

console.log("------------------------------");

// My name is David Vincent Gurning, used to called David. I am from Medan, North Sumatera. And I am student of Universitas Teknologi Del.
// My name is Yudriqul Aulia, used to called Yudi. I am from Jambi, Jambi. And I am student of Universitas Jambi.
// My name is Iko Indra Gunawan, used to called Iko. I am from Surabaya, East Java. And I am student of UPN Veteran East Java.

// for (let i = 0; i < students.length; i++) {
//     console.log(`My name is ${students[i].name}, used to called ${students[i].nickname}. I am from ${students[i].address.city}, ${students[i].address.province}. And i am student at ${students[i].education.bachelor}.`);
// }

// The First Way
// for (let i = 0; i < students.length; i++) {
//     const student = students[i];
//     const describeStudent = `My name is ${students[i].name}, used to called ${students[i].nickname}. I am from ${students[i].address.city}, ${students[i].address.province}. And i am student at ${students[i].education.bachelor}.`;
//     console.log(describeStudent)    
// }

// The Second Way (Recomended)
students.map((student) => {
    const describeStudent = `My name is ${student.name}, used to called ${student.nickname}. I am from ${student.address.city}, ${student.address.province}. And i am student at ${student.education.bachelor}.`;
    console.log(describeStudent);
});

console.log("------------------------------");

// Print all students that from East Java

// The First Way
// students.map((student) => {
//     if (student.address.province === "East Java") {
//         const describeStudent = `My name is ${student.name}, used to called ${student.nickname}. I am from ${student.address.city}, ${student.address.province}. And i am student at ${student.education.bachelor}.`;
//         console.log(describeStudent);
//     }
// });

// The Second Way (Recomended)
const filteredStudents = students.filter((student) => {
    return (
        student.address.province === "East Java" && student.address.city === "Jember"
    );
});
filteredStudents.map((student) => {
    const describeStudent = `My name is ${student.name}, used to called ${student.nickname}. I am from ${student.address.city}, ${student.address.province}. And i am student at ${student.education.bachelor}.`;
    console.log(describeStudent);
});

console.log("------------------------------");

// make ascending data by student name
// const sortedStudents = students.sort((a, b) => {
//     if (a.name > b.name) {
//         return 1;
//     } else {
//         return -1;
//     }
// });
// sortedStudents.map((student) => {    
//     console.log(student.name);
// });

// Asc
// students.sort((a, b) => {
//     if (a.name < b.name) {
//         return -1; // don't do anything
//     } else {
//         return 1; // swap
//     }

//     return 0; // don't do anything
// });
// console.log(students);

// Desc
students.sort((a, b) => {
    if (a.name < b.name) {
        return 1; // don't do anything
    } else {
        return -1; // swap
    }

    return 0; // don't do anything
});
console.log(students);