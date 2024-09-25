// // const title = document.getElementById('title');
// // setTimeout(() => {
// //     console.log("I executed after 5 seconds program run!");
// //     title.innerHTML = "Document Object Mapping";
// // }, 5000);

// import json data from data/students.json with module type json
// import studentsData from '../data/students.json' with { type: 'json' };

// // with commonjs
// // const studentsData = require('../data/students.json');

// // console.log(studentsData);

// Get id of student-content to control the view
// const studentContent = document.getElementById('student-content');
// searchStudentContent(""); //it will execute after html loaded

// // Helper variable
// let studentContentHTML = '';
// studentsData.map((student) => {
//     // variable that will be show in student-content id
//     const studentContent = `
//         <div class="col-md-3">
//             <div class="card" style="width: 18rem">
//                 <div class="card-body">
//                     <h5 class="card-title">${student.name}</h5>
//                     <h6 class="card-subtitle mb-2 text-body-secondary">
//                         ${student.education.bachelor}
//                     </h6>
//                     <p class="card-text">
//                         My name is ${student.name}, used to called ${student.nickName}. I am from S {student.address.city}, ${student. address.province}. And I am student of ${student.education.bachelor}.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     `;
//     studentContentHTML += studentContent;
//     console.log(studentContentHTML);
// });

// studentContent.innerHTML = `<h1>Loading...</h1>`

// // edit the html content in student-content
// setTimeout(() => {
//     //  it will be executed after 3 seconds
//     studentContent.innerHTML = studentContentHTML;
// }, 3000);
//     /* End to show all students */

// /* Start to search the students */
// const search = document.getElementById("search");
// const searchForm = document.getElementById("search-form");

// searchForm.addEventListener("submit", (e) => {
//     e.preventDefault();
// });

// search.addEventListener("input", (e) => {
//     studentContent.innerHTML = "<h1>Loading...</h1>";

//     // If the search is change, the function will be running
//     const searchValue = e.target.value.toLowerCase();

//     // search student by input
//     const filteredStudent = studentsData.filter((student) => {
//         return student.name.toLowerCase().includes(searchValue) || student.education.bachelor.toLowerCase().includes(searchValue);
//     });

//     let studentContentHTML = "";
//     filteredStudent.map((student) => {
//         // variable that will be show in student-content id
//         const studentContent = `
//             <div class="col-md-3">
//                 <div class="card" style="width: 18rem">
//                     <div class="card-body">
//                         <h5 class="card-title">${student.name}</h5>
//                         <h6 class="card-subtitle mb-2 text-body-secondary">
//                             ${student.education.bachelor}
//                         </h6>
//                         <p class="card-text">
//                             My name is ${student.name}, used to called ${student.nickName}. I am from ${student.address.city}, ${student.address.province}. And I am student of ${student.education.bachelor}.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         `;
//         studentContentHTML += studentContent;
//     });

//     studentContent.innerHTML = studentContentHTML;
// });
// /* End to search the students */

/* Start to search the students */
const studentContent = document.getElementById("student-content");
const search = document.getElementById("search");
const searchForm = document.getElementById("search-form");

search.addEventListener("input", (e) => {
    // If the search is change, the function will be running
    const searchValue = e.target.value.toLowerCase();
    searchStudentContent(searchValue);
});

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

// Normal Function
async function searchStudentContent(search) {
    studentContent.innerHTML = "<h1>Loading...</h1>";
    
    const data = await getStudentData(search);
    if (data.length === 0) {
        studentContent.innerHTML = `<h1>Searching ${search} not found</h1>`;
        return;
    }


    // search student by input
    // const filteredStudent = studentsData.filter((student) => {
    //     return student.name.toLowerCase().includes(search) || student.education.bachelor.toLowerCase().includes(search);
    // });

    // Frontend search
    let studentContentHTML = "";
    filteredStudent.map((student) => {
        // variable that will be show in student-content id
        const studentContent = `
            <div class="col-md-3">
                <div class="card" style="width: 18rem">
                    <div class="card-body">
                        <h5 class="card-title">${student.name}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">
                            ${student.education.bachelor}
                        </h6>
                        <p class="card-text">
                            My name is ${student.name}, used to called ${student.nickName}. I am from ${student.address.city}, ${student.address.province}. And I am student of ${student.education.bachelor}.
                        </p>
                    </div>
                </div>
            </div>
        `;
        studentContentHTML += studentContent;
    });
    studentContent.innerHTML = studentContentHTML;
}

// Arrow function, this function is to get students.json data that can be rendered to html file
const getStudentData = async () => {
    const response = await fetch("./data/students.json");
    const data = await response.json();

    // search student by input(backend search)
    const filteredData = data.filter((student) => {
        return (
            student.name.toLowerCase().includes(search) || student.education.bachelor.toLowerCase().includes(search)
        );
    });

    return filteredData;
};

/* Show all student data */
searchStudentContent("");