loadStudents();
document.getElementById("search-btn").addEventListener("click", () => {
    let name = document.getElementById("search-name").value.toLowerCase().trim();
    let major = document.getElementById("search-major").value.toLowerCase().trim();
    let interest = document.getElementById("search-interest").value.toLowerCase().trim();
    loadStudents(name, major, interest);
});
document.getElementById("reset-search-btn").addEventListener("click", () => {
    document.getElementById("search-name").value = "";
    document.getElementById("search-major").value = "";
    document.getElementById("search-interest").value = "";
    loadStudents();
});


/**
 * This function is called when the page loads. It fetches the students
 * @param name Name to search
 * @param major Major to search
 * @param interest Interest to search
 */
function loadStudents(name, major, interest) {
    fetch("https://cs571.org/s23/hw3/api/students", {
        method: "GET",
        headers: {
            "X-CS571-ID": "bid_00000000000000000000"
        }
    }).then(response => response.json()).then(data => {

        let result = data.reduce((curr, stud) => {
            if (name && !nameIncludes(stud.name.first, stud.name.last, name)) {
                return curr;
            }
            if (major && !stud.major.toLowerCase().includes(major)) {
                return curr;
            }
            if (interest && !stud.interests.some(inter => inter.toLowerCase().includes(interest))) {
                return curr;
            }
            curr.push(stud);
            return curr;
        }, []);
        console.log(result);
        document.getElementById("students").innerHTML = buildStudentsHtml(result);
    });
}

function nameIncludes(firstName, lastName, toSearch) {
    console.log("name search running")
    let found = false;
    toSearch.split(" ").every(name => {
        if (firstName.toLowerCase().includes(name) || lastName.toLowerCase().includes(name)) {
            found = true;
            return false; // break
        }
    });
    return found;
}

/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 *
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
    return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 *
 * @param {*} stud
 * @returns
 */
function buildStudentHtml(stud) {
    let html = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
    html += `<h2>${stud.name.first} ${stud.name.last}</h2>`;
    html += `<strong>${stud.major}</strong>`;
    html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and ${stud.fromWisconsin ? "is" : "is not"} from Wisconsin.</p>`;
    html += `<p> They have ${stud.interests.length} interests including...</p><ul>`;
    html += stud.interests.map(interest => `<li>${interest}</li>`).join("\n");
    html += `</ul></div>`
    return html;
}
