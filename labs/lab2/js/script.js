
const students = [
  ["Jonathan", [100, 95, 98, 100]],
  ["Joseph", [25, 32, 16, 47]],
  ["Jotaro", [90, null, 88, 92]],
  ["Josuke", [37, 64, null, 43]],
  ["Giorno", [67, 55, 82, 73]],
  ["Jolyne", [42, 51, 92, 48]],
  ["Johnny", [95, 93, 97, 96]],
  ["Josefumi", [72, 74, 76, 78]]
];

const detailsData = [
  ["Jonathan", [80, 85, 90]],
  ["Joseph", [32, null, 15]],
  ["Jotaro", [88, 92, null]]
];

function avg(arr) {
  let sum = 0;
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] === "number") {
      sum = sum + arr[i];
      count = count + 1;
    }
  }

  if (count === 0) {
    return "-";
  } else {
    return Math.round(sum / count);
  }
}

function letter(n) {
  if (n === "-") {
    return "-";
  } else if (n >= 90) {
    return "A";
  } else if (n >= 80) {
    return "B";
  } else if (n >= 70) {
    return "C";
  } else if (n >= 60) {
    return "D";
  } else {
    return "F";
  }
}

const table = document.getElementById("gradebookBody");
if (table !== null) {
  console.log(students);

  for (let i = 0; i < students.length; i++) {
    let name = students[i][0];
    let grades = students[i][1];
    let a = avg(grades);

    let grade1 = grades[0];
    let grade2 = grades[1];
    let grade3 = grades[2];
    let grade4 = grades[3];

    if (grade1 === null) g1 = "-";
    if (grade2 === null) g2 = "-";
    if (grade3 === null) g3 = "-";
    if (grade4 === null) g4 = "-";

    table.innerHTML = table.innerHTML +
      "<tr>" +
      "<td><a href='student.html?name=" + encodeURIComponent(name) + "'>" + name + "</a></td>" +
      "<td>" + grade1 + "</td>" +
      "<td>" + grade2 + "</td>" +
      "<td>" + grade3 + "</td>" +
      "<td>" + grade4 + "</td>" +
      "<td>" + a + "</td>" +
      "<td>" + letter(a) + "</td>" +
      "</tr>";
  }
}

const details = document.getElementById("details");
if (details !== null) {
  const params = new URLSearchParams(window.location.search);
  const name = params.get("name");

  document.getElementById("studentName").textContent = name;

  for (let i = 0; i < detailsData.length; i++) {
    if (detailsData[i][0] === name) {
      console.log(detailsData[i]);

      let grades = detailsData[i][1];
      let output = "";

      for (let j = 0; j < grades.length; j++) {
        if (grades[j] === null) {
          output = output + "-";
        } else {
          output = output + grades[j];
        }

        if (j < grades.length - 1) {
          output = output + ", ";
        }
      }

      details.textContent = "Assessment grades: " + output;
    }
  }
}
